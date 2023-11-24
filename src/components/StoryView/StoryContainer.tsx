import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Metrics } from '../../theme';
import ProgressView from './ProgressView';
import StoryView from './StoryView';
import { useStoryContainer } from './hooks';
import styles from './styles';
import {
  ClickPosition,
  StoryContainerProps,
  StoryMode,
  StoryRef,
} from './types';

const StoryContainer = forwardRef<StoryRef, StoryContainerProps>(
  (
    {
      renderHeaderComponent,
      renderFooterComponent,
      renderCustomView,
      userStories,
      enableProgress = true,
      headerViewProps,
      customViewProps,
      footerViewProps,
      progressViewProps,
      storyContainerViewProps,
      gestureHandler,
      ...props
    }: StoryContainerProps,
    ref
  ) => {
    const viewedStories = useRef<boolean[]>(
      Array(props?.stories?.length)
        .fill(props?.stories)
        .map((item, index) => item?.[index]?.isSeen ?? false)
    );

    const {
      progressIndex,
      isPause,
      setPause,
      isLoaded,
      duration,
      opacity,
      onImageLoaded,
      onVideoLoaded,
      changeStory,
      setLoaded,
      setDuration,
      videoDuration,
      onVideoProgress,
      onVideoEnd,
      onArrowClick,
      onStoryPressHold,
      isKeyboardVisible,
      setVideoDuration,
      onStoryPressRelease,
      setVisibleElements,
      rootStyle,
      containerStyle,
    } = useStoryContainer(props, viewedStories);

    const viewRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      pause: (pause: boolean) => {
        if (props?.index === props?.userStoryIndex) {
          setPause(pause);
        }
      },
      handleLongPress: (visibility: boolean) => {
        if (props?.index === props?.userStoryIndex) {
          setVisibleElements(!visibility);
          setPause(visibility);
        }
      },

      viewedStories: viewedStories.current,
    }));

    useEffect(() => {
      setLoaded(false);
      setDuration(
        props.stories?.[progressIndex]?.duration ?? Metrics.defaultDuration
      );
    }, [progressIndex, props.stories, setDuration, setLoaded]);

    const storyMode: StoryMode =
      props?.userStoryIndex !== undefined
        ? StoryMode.MultiStory
        : StoryMode.SingleStory;
    const [viewHeight, setViewHeight] = useState<number>(0);
    const bottom =
      storyMode === StoryMode.SingleStory
        ? isKeyboardVisible
          ? viewHeight
          : 0
        : 0;

    const storyViewContent = () => {
      return (
        <GestureHandlerRootView style={styles.rootViewStyle}>
          <PanGestureHandler
            activateAfterLongPress={200}
            onGestureEvent={gestureHandler}>
            <Animated.View
              style={props?.containerStyle ?? styles.parentView}
              {...storyContainerViewProps}>
              <View
                onLayout={({ nativeEvent }) => {
                  if (isKeyboardVisible) return;
                  const { height } = nativeEvent.layout;
                  viewRef?.current?.setNativeProps({ height });
                }}
                style={props?.containerStyle ?? styles.parentView}
                {...storyContainerViewProps}>
                <TouchableOpacity
                  activeOpacity={1}
                  delayLongPress={200}
                  onPress={(e: { nativeEvent: any }) =>
                    changeStory(e.nativeEvent)
                  }
                  onLongPress={onStoryPressHold}
                  onPressOut={onStoryPressRelease}>
                  <StoryView
                    viewRef={viewRef}
                    duration={duration}
                    onVideoLoaded={onVideoLoaded}
                    onImageLoaded={onImageLoaded}
                    progressIndex={progressIndex}
                    videoDuration={videoDuration}
                    onVideoEnd={onVideoEnd}
                    onVideoProgress={onVideoProgress}
                    pause={isPause}
                    index={props?.index ?? 0}
                    storyIndex={props?.userStoryIndex ?? 0}
                    stories={props.stories}
                    imageStyle={props.imageStyle}
                    videoProps={props?.videoProps}
                    sourceIndicatorProps={props?.sourceIndicatorProps}
                    showSourceIndicator={props?.showSourceIndicator ?? true}
                  />
                </TouchableOpacity>
                {enableProgress && (
                  <View
                    style={[styles.progressView, { opacity }]}
                    {...progressViewProps}>
                    <ProgressView
                      next={() => onArrowClick(ClickPosition.Right)}
                      isLoaded={isLoaded}
                      duration={duration}
                      storyIndex={props?.userStoryIndex ?? 0}
                      currentIndex={progressIndex}
                      setVideoDuration={setVideoDuration}
                      index={props?.index ?? 0}
                      videoDuration={videoDuration ?? 0}
                      pause={enableProgress && isPause}
                      stories={props?.stories}
                      barStyle={props?.barStyle}
                      currentStory={props?.stories[progressIndex]}
                      length={props?.stories?.map((_, i) => i)}
                      progress={{ id: progressIndex }}
                    />
                  </View>
                )}
                {renderHeaderComponent && (
                  <View
                    style={[
                      styles.topView,
                      props?.headerStyle ?? {},
                      { opacity },
                    ]}
                    {...headerViewProps}>
                    <>
                      {renderHeaderComponent?.({
                        userStories,
                        story: props?.stories,
                        progressIndex,
                        userStoryIndex: props?.userStoryIndex,
                      })}
                    </>
                  </View>
                )}
                {renderCustomView && (
                  <View
                    style={[
                      styles.customView,
                      props?.customViewStyle ?? {},
                      { opacity },
                    ]}
                    {...customViewProps}>
                    <>
                      {renderCustomView?.({
                        userStories,
                        story: props?.stories,
                        progressIndex,
                        userStoryIndex: props?.userStoryIndex,
                      })}
                    </>
                  </View>
                )}
              </View>
            </Animated.View>
          </PanGestureHandler>
          {renderFooterComponent && (
            <Animated.View
              style={[
                styles.bottomView,
                props?.footerStyle ?? {},
                { opacity, bottom },
              ]}
              onLayout={({ nativeEvent }) => {
                setViewHeight(nativeEvent.layout.height);
              }}
              {...footerViewProps}>
              <>
                {renderFooterComponent?.({
                  userStories,
                  story: props?.stories,
                  progressIndex,
                  userStoryIndex: props?.userStoryIndex,
                })}
              </>
            </Animated.View>
          )}
        </GestureHandlerRootView>
      );
    };

    return (
      <SafeAreaView style={rootStyle}>
        <KeyboardAvoidingView
          style={containerStyle}
          keyboardVerticalOffset={Metrics.keyboardVerticalOffset}
          behavior={'padding'}>
          {props.visible && storyViewContent()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);

export default StoryContainer;
