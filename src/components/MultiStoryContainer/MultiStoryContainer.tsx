import { FlashList, FlashListProps } from '@shopify/flash-list';
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Modal } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Metrics } from '../../theme';
import { Footer } from '../Footer';
import { Indicator, ProfileHeader, StoryContainer } from '../StoryView';
import { OverlayPositions, type StoriesType } from '../StoryView/types';
import { useMultiStoryContainer, useMultiStoryItems } from './hooks';
import styles from './styles';
import type {
  ListItemProps,
  ListItemRef,
  MultiStoryContainerProps,
  MultiStoryListItemProps,
} from './types';

/**
 * AnimatedFlashList is a wrapper around FlashList component to animate the list items.
 * Main purpose to wrap inside Animated to use useAnimatedScrollHandler for scroll animation.
 */
const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<StoriesType>>(FlashList);

const MultiStoryListItem = forwardRef<ListItemRef, MultiStoryListItemProps>(
  (
    {
      item,
      index,
      scrollX,
      storyIndex,
      onComplete,
      viewedStories,
      isTransitionActive,
      flatListRef,
      storyLength,
      isInitialStory,
      renderOverlayView = () => <></>,
      overlayViewPostion = OverlayPositions.Bottom,
      ...props
    }: MultiStoryListItemProps,
    ref
  ) => {
    const {
      animationStyle,
      nextStory,
      previousStory,
      storyInitialIndex,
      storyRef,
    } = useMultiStoryItems(
      index,
      ref,
      viewedStories,
      storyIndex,
      storyLength,
      isInitialStory,
      onComplete,
      scrollX,
      flatListRef,
      props?.transitionMode
    );

    useImperativeHandle(ref, () => ({
      handleLongPress: (visibility: boolean) =>
        storyRef.current?.handleLongPress(visibility),
      pause: (pauseState: boolean) => storyRef.current?.pause(pauseState),
      setMuted: (muteState: boolean) => {
        storyRef.current?.setMuted(muteState);
      },
      onScrollBegin: () => {},
      onScrollEnd: () => {},
    }));

    return (
      <>
        <Animated.View
          key={item.id}
          style={[styles.itemContainer, animationStyle]}>
          {storyIndex === index || isTransitionActive ? (
            <StoryContainer
              visible={true}
              extended={true}
              key={index + item?.id}
              ref={storyRef}
              userStories={item}
              nextStory={nextStory}
              previousStory={previousStory}
              stories={item.stories}
              progressIndex={storyInitialIndex < 0 ? 0 : storyInitialIndex}
              maxVideoDuration={15}
              renderOverlayView={renderOverlayView}
              overlayViewPostion={overlayViewPostion}
              renderHeaderComponent={() => (
                <ProfileHeader
                  userImage={{ uri: item.profile ?? '' }}
                  userName={item.username}
                  userMessage={item.title}
                  onClosePress={() => {
                    onComplete?.();
                  }}
                />
              )}
              renderFooterComponent={() => <Footer />}
              {...props}
              index={index}
              userStoryIndex={storyIndex}
            />
          ) : (
            props?.renderIndicatorComponent?.() ?? <Indicator />
          )}
        </Animated.View>
      </>
    );
  }
);

const MultiStoryContainer = forwardRef<ListItemRef, MultiStoryContainerProps>(
  (
    {
      stories,
      visible,
      onComplete,
      onUserStoryIndexChange,
      viewedStories = [],
      pointers = { pageX: 0, pageY: 0 },
      ...props
    },
    ref
  ) => {
    const flatListRef = useRef<any>(null);
    const initialStoryIndex = useRef(props.userStoryIndex);
    const itemsRef = useRef<ListItemRef[]>([]);
    const [isTransitionActive, setIsTransitionActive] =
      useState<boolean>(false);

    useEffect(() => {
      itemsRef.current = itemsRef.current.slice(0, stories.length);
    }, [itemsRef, stories]);

    const handleLongPress = (visiblity: boolean) => {
      itemsRef.current[storyIndexRef.current]?.handleLongPress(visiblity);
    };

    useImperativeHandle(ref, () => ({
      pause: (pauseState: boolean) => {
        itemsRef.current[storyIndexRef.current]?.pause(pauseState);
      },
      setMuted: (muteState: boolean) => {
        itemsRef.current[storyIndexRef.current]?.setMuted(muteState);
      },
      handleLongPress: (visibility: boolean) => {
        itemsRef.current[storyIndexRef.current]?.handleLongPress(visibility);
      },
      onScrollBegin: () => {},
      onScrollEnd: () => {},
    }));

    const {
      storyIndex,
      onViewRef,
      viewabilityConfig,
      gestureHandler,
      onScroll,
      scrollX,
      listAnimatedStyle,
      isKeyboardVisible,
      setIsScrollActive,
      updateStoryIndex,
      isScrollActiveRef,
      storyIndexRef,
      animationModalStyle,
    } = useMultiStoryContainer(
      flatListRef,
      props,
      handleLongPress,
      onComplete,
      pointers,
      visible
    );

    const onScrollBeginDragFlashList = () => {
      setIsScrollActive(true);
      isScrollActiveRef.current = true;
      itemsRef.current[storyIndex]?.onScrollBegin();
    };

    const onScrollEndDragFlashList = () => {
      setIsScrollActive(false);
      isScrollActiveRef.current = false;
      itemsRef.current[storyIndex]?.onScrollEnd();
      updateStoryIndex();
    };

    useEffect(() => {
      onUserStoryIndexChange?.(storyIndex);
    }, [onUserStoryIndexChange, storyIndex]);

    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => onComplete?.()}>
        <GestureHandlerRootView style={styles.rootViewStyle}>
          <GestureDetector gesture={gestureHandler}>
            <Animated.View
              style={[styles.mainFlashListContainer, animationModalStyle]}>
              <AnimatedFlashList
                horizontal
                pagingEnabled
                bounces={false}
                data={stories}
                scrollEnabled={!isKeyboardVisible}
                ref={flatListRef}
                onScroll={onScroll}
                onScrollBeginDrag={onScrollBeginDragFlashList}
                onScrollEndDrag={onScrollEndDragFlashList}
                scrollEventThrottle={16}
                initialScrollIndex={storyIndex}
                estimatedItemSize={Metrics.windowWidth}
                overrideItemLayout={layout => {
                  layout.size = Metrics.windowWidth;
                }}
                keyboardShouldPersistTaps="handled"
                onLayout={() => setIsTransitionActive(true)}
                onViewableItemsChanged={onViewRef}
                viewabilityConfig={viewabilityConfig.current}
                keyExtractor={item => item?.title + item?.id?.toString()}
                extraData={storyIndex}
                renderItem={({ item, index }: ListItemProps) => (
                  <Animated.View
                    style={[styles.mainFlashListContainer, listAnimatedStyle]}>
                    <MultiStoryListItem
                      ref={(elements: any) =>
                        (itemsRef.current[index] = elements)
                      }
                      {...{
                        item,
                        index,
                        storyIndex,
                        onComplete,
                        viewedStories,
                        scrollX,
                        isTransitionActive,
                        flatListRef,
                        storyLength: stories.length,
                        isInitialStory: initialStoryIndex.current === index,
                      }}
                      {...props}
                    />
                  </Animated.View>
                )}
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    );
  }
);

export default memo(MultiStoryContainer);
