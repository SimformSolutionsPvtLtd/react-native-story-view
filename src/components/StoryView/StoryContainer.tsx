import React, { useEffect } from 'react';
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

const StoryContainer = (props: StoryContainerProps) => {
  const {
    progressIndex,
    isPause,
    isLoaded,
    duration,
    setPause,
    onImageLoaded,
    onVideoLoaded,
    changeStory,
    setLoaded,
    setDuration,
    onArrowClick,
  } = useStoryContainer(props);

  useEffect(() => {
    setLoaded(false);
    setDuration(
      props.stories?.[progressIndex]?.duration ?? Metrics.defaultDuration
    );
  }, [progressIndex, props.stories, setDuration, setLoaded]);

  const storyViewContent = () => {
    return (
      <View
        style={props.containerStyle ? props.containerStyle : styles.parentView}>
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={500}
          onPress={(e: { nativeEvent: any }) => changeStory(e.nativeEvent)}
          onLongPress={() => setPause(true)}
          onPressOut={() => setPause(false)}>
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
          <View style={styles.progressView}>
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
        <View style={styles.topView}>
          {props?.headerComponent && props.headerComponent}
        </View>
        <View style={styles.bottomView}>
          {/* {props.footerView?.isShowReply && !props.footerComponent && (
              <FooterView />
            )} */}
          {!props.footerView?.isShowReply && props.footerComponent && (
            <View style={styles.bottomView}>{props.footerComponent}</View>
          )}
        </View>
        <View style={styles.customView}>{props.customView}</View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Metrics.isIOS ? 'padding' : 'height'}>
        <View>{props.visible ? storyViewContent() : <View />}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoryContainer;
