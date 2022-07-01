import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native';
import { Metrics } from '../../theme';
import { useStoryContainer } from './hooks';
import ProgressView from './ProgressView';
import StoryView from './StoryView';
import styles from './styles';
import { ClickPosition, StoryContainerProps } from './types';

const StoryContainer = (props: StoryContainerProps) => {
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
    onStoryPressRelease
  } = useStoryContainer(props);

  useEffect(() => {
    setLoaded(false);
    setDuration(
      props.stories?.[progressIndex]?.duration ?? Metrics.defaultDuration
    );
  }, [progressIndex, props.stories, setDuration, setLoaded]);

  const storyViewContent = () => {
    return (
      <>
        <View style={props.containerStyle ?? styles.parentView}>
          <TouchableOpacity
            activeOpacity={1}
            delayLongPress={200}
            onPress={(e: { nativeEvent: any }) => changeStory(e.nativeEvent)}
            onLongPress={onStoryPressHold}
            onPressOut={onStoryPressRelease}>
            <StoryView
              stories={props.stories}
              duration={duration}
              onVideoLoaded={onVideoLoaded}
              onImageLoaded={onImageLoaded}
              progressIndex={progressIndex}
              imageStyle={props.imageStyle}
              pause={isPause}
            />
          </TouchableOpacity>
          {(props?.enableProgress || true) && (
            <View style={[styles.progressView, { opacity }]}>
              <ProgressView
                next={() => onArrowClick(ClickPosition.Right)}
                isLoaded={isLoaded}
                duration={duration}
                pause={!props.enableProgress && isPause}
                stories={props.stories}
                currentIndex={progressIndex}
                barStyle={props.barStyle}
                currentStory={props.stories[progressIndex]}
                length={props.stories.map((_, i) => i)}
                progress={{ id: progressIndex }}
              />
            </View>
          )}
          {props?.headerComponent && (
            <View style={[styles.topView, { opacity }]}>
              {props.headerComponent}
            </View>
          )}
          {props?.customView && (
            <View style={[styles.customView, { opacity }]}>
              {props.customView}
            </View>
          )}
        </View>
        {props?.footerComponent && (
          <View style={[styles.bottomView, { opacity }]}>
            {props.footerComponent}
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Metrics.isIOS ? 'padding' : 'height'}>
        {props.visible && storyViewContent()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoryContainer;
