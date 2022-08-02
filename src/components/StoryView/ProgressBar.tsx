import React from 'react';
import { Animated, LayoutRectangle, View } from 'react-native';
import { useProgressBar } from './hooks';
import styles from './styles';
import type { ProgressBarProps } from './types';

const ProgressBar = (props: ProgressBarProps) => {
  const { barActiveColor, barInActiveColor, barHeight, scale, setWidth } =
    useProgressBar(props);

  const onLayoutAdded = (evt: LayoutRectangle) => {
    setWidth(evt.width);
  };

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
