import React, { useEffect, useRef } from 'react';
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
import { ClickPosition, StoryContainerProps } from './types';

const StoryContainer = ({
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
}: StoryContainerProps) => {
  const {
    progressIndex,
    isPause,
    isLoaded,
    duration,
    opacity,
    onImageLoaded,
    onVideoLoaded,
    changeStory,
    setLoaded,
    setDuration,
    onArrowClick,
    onStoryPressHold,
    isKeyboardVisible,
    onStoryPressRelease,
    rootStyle,
    containerStyle,
  } = useStoryContainer(props);

  const viewRef = useRef<View>(null);

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
          style={props.containerStyle ?? styles.parentView}
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
                index={props?.index ?? 0}
                pause={enableProgress && isPause}
                stories={props.stories}
                currentIndex={progressIndex}
                barStyle={props.barStyle}
                currentStory={props.stories[progressIndex]}
                length={props.stories.map((_, i) => i)}
                progress={{ id: progressIndex }}
              />
            </View>
          )}
          {renderHeaderComponent && (
            <View style={[styles.topView, { opacity }]} {...headerViewProps}>
              <>
                {renderHeaderComponent?.(
                  userStories,
                  progressIndex,
                  props?.userStoryIndex
                )}
              </>
            </View>
          )}
          {renderCustomView && (
            <View style={[styles.customView, { opacity }]} {...customViewProps}>
              <>
                {renderCustomView?.(
                  userStories,
                  progressIndex,
                  props?.userStoryIndex
                )}
              </>
            </View>
          )}
        </View>
        {renderFooterComponent && (
          <View style={[styles.bottomView, { opacity }]} {...footerViewProps}>
            <>
              {renderFooterComponent?.(
                userStories,
                progressIndex,
                props?.userStoryIndex
              )}
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
};

export default StoryContainer;
