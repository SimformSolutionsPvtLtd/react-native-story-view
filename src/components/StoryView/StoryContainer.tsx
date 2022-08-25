import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Metrics } from '../../theme';
import { useStoryContainer } from './hooks';
import ProgressView from './ProgressView';
import StoryView from './StoryView';
import styles from './styles';
import { ClickPosition, StoryContainerProps, StoryRef } from './types';

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
      viewedStories: viewedStories.current,
    }));

    useEffect(() => {
      setLoaded(false);
      setDuration(
        props.stories?.[progressIndex]?.duration ?? Metrics.defaultDuration
      );
    }, [progressIndex, props.stories, setDuration, setLoaded]);

    const storyViewContent = () => {
      return (
        <>
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
              onPress={(e: { nativeEvent: any }) => changeStory(e.nativeEvent)}
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
              <View style={[styles.topView, { opacity }]} {...headerViewProps}>
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
                style={[styles.customView, { opacity }]}
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
          {renderFooterComponent && (
            <View style={[styles.bottomView, { opacity }]} {...footerViewProps}>
              <>
                {renderFooterComponent?.({
                  userStories,
                  story: props?.stories,
                  progressIndex,
                  userStoryIndex: props?.userStoryIndex,
                })}
              </>
            </View>
          )}
        </>
      );
    };

    return (
      <SafeAreaView style={rootStyle}>
        <KeyboardAvoidingView
          style={containerStyle}
          keyboardVerticalOffset={50}
          behavior={'padding'}>
          {props.visible && storyViewContent()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);

export default StoryContainer;
