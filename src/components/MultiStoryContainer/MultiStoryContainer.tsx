import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Modal, SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMultiStoryContainer } from './hooks';
import { StoryContainer, ProfileHeader } from '../StoryView';
import { Footer } from '../Footer';
import { Metrics } from '../../theme';
import styles from './styles';
import type {
  ListItemProps,
  ListItemRef,
  MultiStoryContainerProps,
  MultiStoryListItemProps,
} from './types';
import type { StoryRef } from '../StoryView/types';

const MultiStoryListItem = forwardRef<ListItemRef, MultiStoryListItemProps>(
  (
    {
      item,
      index,
      animatedTransitionStyle,
      nextStory,
      previousStory,
      storyIndex,
      onComplete,
      viewedStories,
      ...props
    }: MultiStoryListItemProps,
    ref
  ) => {
    const storyRef = useRef<StoryRef>(null);
    const storyInitialIndex: number = viewedStories?.[index]?.findIndex(
      (val: boolean) => !val
    );

    useImperativeHandle(ref, () => ({
      onScrollBegin: () => storyRef?.current?.pause(true),
      onScrollEnd: () => storyRef?.current?.pause(false),
    }));

    return (
      <Animated.View key={item.id} style={styles.itemContainer}>
        <Animated.View style={animatedTransitionStyle(index)}>
          <StoryContainer
            visible={true}
            key={index + item?.id}
            ref={storyRef}
            userStories={item}
            nextStory={nextStory}
            previousStory={previousStory}
            stories={item.stories}
            progressIndex={storyInitialIndex < 0 ? 0 : storyInitialIndex}
            maxVideoDuration={15}
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
        </Animated.View>
      </Animated.View>
    );
  }
);

const MultiStoryContainer = ({
  stories,
  visible,
  onComplete,
  viewedStories = [],
  ...props
}: MultiStoryContainerProps) => {
  const flatListRef = useRef<any>(null);

  const {
    storyIndex,
    onViewRef,
    viewabilityConfig,
    animatedTransitionStyle,
    onScroll,
  } = useMultiStoryContainer(flatListRef, props);

  const itemsRef = useRef<ListItemRef[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, stories.length);
  }, [itemsRef, stories]);

  if (!visible) return null;

  const nextStory = () => {
    if (storyIndex + 1 === stories.length) {
      onComplete?.();
      return;
    }
    if (storyIndex >= stories.length - 1) return;
    flatListRef.current?.scrollToIndex({
      index: storyIndex + 1,
      animated: true,
    });
  };

  const previousStory = () => {
    if (storyIndex === 0) return;
    flatListRef.current?.scrollToIndex({
      index: storyIndex - 1,
      animated: true,
    });
  };

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => onComplete?.()}>
      <SafeAreaView style={styles.container}>
        <Animated.FlatList
          horizontal
          pagingEnabled
          initialNumToRender={2}
          data={stories}
          ref={flatListRef}
          onScroll={onScroll}
          onScrollBeginDrag={() =>
            itemsRef.current[storyIndex]?.onScrollBegin()
          }
          onScrollEndDrag={() => itemsRef.current[storyIndex]?.onScrollEnd()}
          scrollEventThrottle={16}
          initialScrollIndex={storyIndex}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(_, index) => ({
            length: Metrics.screenWidth,
            offset: Metrics.screenWidth * index,
            index,
          })}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewabilityConfig.current}
          decelerationRate={Metrics.isIOS ? 0.99 : 0.92}
          keyExtractor={item => item?.title + item?.id?.toString()}
          contentContainerStyle={{
            width: Metrics.screenWidth * stories.length,
          }}
          extraData={storyIndex}
          renderItem={({ item, index }: ListItemProps) => (
            <MultiStoryListItem
              ref={(elements: any) => (itemsRef.current[index] = elements)}
              {...{
                item,
                index,
                animatedTransitionStyle,
                nextStory,
                previousStory,
                storyIndex,
                onComplete,
                viewedStories,
              }}
              {...props}
            />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default MultiStoryContainer;
