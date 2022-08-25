import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Colors } from '../../../theme';
import { ProgressBarProps, StroyTypes } from '../types';
import { ProgressState } from '../types';

const useProgressBar = ({
  active,
  index,
  storyIndex,
  videoDuration,
  currentIndex,
  duration,
  storyType,
  ...props
}: ProgressBarProps) => {
  const scaleRef = useRef(new Animated.Value(0));
  const scale = scaleRef?.current;
  const [width, setWidth] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(duration);
  const isVideoStory = useRef(storyType === StroyTypes.Video);

  // Restart ProgressBar when story changes
  useEffect(() => {
    if (index === currentIndex) {
      scale.setValue(0);
      setRemainingTime(duration);
    }
  }, [storyIndex, currentIndex, index, scale, duration, setRemainingTime]);

  useEffect(() => {
    if (isVideoStory.current) return;
    const progressBarWidth =
      Number.parseInt(JSON.stringify(scaleRef.current), 10) ?? 0;
    setRemainingTime(duration - (progressBarWidth * duration) / width);
  }, [props?.pause, width, duration]);

  const barActiveColor = props?.barStyle?.barActiveColor ?? Colors.activeColor;
  const barInActiveColor =
    props?.barStyle?.barInActiveColor ?? Colors.inActiveColor;
  const barHeight = props?.barStyle?.barHeight ?? 2;

  const getDuration = useCallback(() => {
    if (props.pause) {
      scale.stopAnimation();
      return 0;
    }
    if (remainingTime === 0) {
      return duration * 1000;
    }
    return remainingTime * 1000;
  }, [remainingTime, scale, props?.pause, duration]);

  useEffect(() => {
    if (isVideoStory.current) return;
    switch (active) {
      case ProgressState.Default:
        return scale.setValue(0);
      case ProgressState.InProgress:
        if (props.isLoaded)
          return Animated.timing(scale, {
            toValue: width,
            duration: getDuration(),
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(({ finished }) => {
            if (finished) props?.next && props?.next();
          });
        else {
          return scale.setValue(0);
        }
      case ProgressState.Completed:
        return scale.setValue(width);
      case ProgressState.Paused:
        return scale.setValue(
          Number.parseInt(JSON.stringify(scaleRef.current), 10)
        );
      default:
        return scale.setValue(0);
    }
  }, [active, isVideoStory, getDuration, props, scale, width]);

  useEffect(() => {
    if (!isVideoStory.current) return;
    switch (active) {
      case ProgressState.Default:
        return scale.setValue(0);
      case ProgressState.InProgress: {
        if (props?.isLoaded) {
          const videoProgress: number =
            (width * videoDuration[currentIndex]) / duration;
          if (videoDuration[currentIndex] >= duration) {
            props?.next && props?.next();
            props?.setVideoDuration(Array(props?.length).fill(0));
            return;
          }
          return scale.setValue(videoProgress);
        } else {
          return scale.setValue(0);
        }
      }
      case ProgressState.Completed:
        return scale.setValue(width);
      case ProgressState.Paused:
        return scale.setValue(
          Number.parseInt(JSON.stringify(scaleRef.current), 10)
        );
      default:
        return scale.setValue(0);
    }
  }, [
    index,
    currentIndex,
    active,
    videoDuration,
    duration,
    isVideoStory,
    props,
    scale,
    width,
  ]);

  return {
    barActiveColor,
    barInActiveColor,
    barHeight,
    scale,
    width,
    setWidth,
  };
};

export default useProgressBar;
