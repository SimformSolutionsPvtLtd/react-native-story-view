import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Colors } from '../../../theme';
import type { ProgressBarProps } from '../types';
import { ProgressState } from '../types';

const useProgressBar = ({
  active,
  index,
  storyIndex,
  currentIndex,
  duration,
  ...props
}: ProgressBarProps) => {
  const scaleRef = useRef(new Animated.Value(0));
  const scale = scaleRef?.current;
  const [width, setWidth] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(duration);

  // Restart ProgressBar when story changes
  useEffect(() => {
    if (index === currentIndex) {
      scale.setValue(0);
      setRemainingTime(duration);
    }
  }, [storyIndex, currentIndex, index, scale, duration, setRemainingTime]);

  useEffect(() => {
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
  }, [active, getDuration, props, scale, width]);

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
