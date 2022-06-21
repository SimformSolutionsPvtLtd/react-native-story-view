import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Colors } from '../../../theme';
import type { ProgressBarProps } from '../types';

const useProgressBar = (props: ProgressBarProps) => {
  const scale = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState<number>(0);
  const { duration, active } = props;
  const [pauseTime, setPauseTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);

  const barActiveColor =
    props.barStyle && props.barStyle.barActiveColor
      ? props.barStyle.barActiveColor
      : Colors.activeColor;

  const barInActiveColor =
    props.barStyle && props.barStyle.barInActiveColor
      ? props.barStyle.barInActiveColor
      : Colors.inActiveColor;

  const barHeight =
    props.barStyle && props.barStyle.barHeight ? props.barStyle.barHeight : 4;

  const getDuration = useCallback(() => {
    const totalPlaytime = duration * 1000;
    if (props.pause) {
      scale.stopAnimation(() => undefined);
      return 0;
    }
    if (pauseTime === 0) {
      return totalPlaytime;
    }
    const lastTime = pauseTime - startTime;
    return totalPlaytime - lastTime;
  }, [duration, pauseTime, props.pause, scale, startTime]);

  useEffect(() => {
    switch (active) {
      case 0:
        return scale.setValue(0);
      case 1:
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
      case 2:
        return scale.setValue(width);
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
    startTime,
    setPauseTime,
    setStartTime,
  };
};

export default useProgressBar;
