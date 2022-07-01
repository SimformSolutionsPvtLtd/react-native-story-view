import React, { useEffect } from 'react';
import { Animated, LayoutRectangle, View } from 'react-native';
import { useProgressBar } from './hooks';
import styles from './styles';
import type { ProgressBarProps } from './types';

const ProgressBar = (props: ProgressBarProps) => {
  const { index, currentIndex } = props;

  const {
    barActiveColor,
    barInActiveColor,
    barHeight,
    scale,
    setWidth,
    setPauseTime,
    startTime,
    setStartTime,
  } = useProgressBar(props);

  const onLayoutAdded = (evt: LayoutRectangle) => {
    setWidth(evt.width);
  };

  useEffect(() => {
    setPauseTime(0);
    setStartTime(0);
  }, [currentIndex, setStartTime, setPauseTime]);

  useEffect(() => {
    if (index === currentIndex) {
      if (props.pause) {
        const endTime = Date.now();
        setPauseTime(endTime ?? 5);
      }
      if (startTime === 0) {
        setStartTime(Date.now());
      }
    }
  }, [currentIndex, index, props.pause, setPauseTime, setStartTime, startTime]);

  return (
    <View
      onLayout={evt => onLayoutAdded(evt.nativeEvent.layout)}
      style={[
        styles.progressBarContainer,
        {
          backgroundColor: barInActiveColor,
          height: barHeight,
        },
      ]}>
      <Animated.View
        style={[
          styles.progressBarContainer,
          styles.currentBarContainer,
          {
            width: scale,
            backgroundColor: barActiveColor,
            height: barHeight,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
