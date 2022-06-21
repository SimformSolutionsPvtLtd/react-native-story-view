import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import ProgressBar from './ProgressBar';
import styles from './styles';
import type { ProgressBarsProps } from './types';

const ProgressView = (props: ProgressBarsProps) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.pause) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [opacity, props.pause]);

  return (
    <Animated.View style={[styles.progressBarArray]}>
      {props.length.map((i: number, index) => (
        <ProgressBar
          index={index}
          key={i}
          barStyle={props.barStyle}
          duration={props.duration || 3}
          currentIndex={props.currentIndex}
          next={props.next}
          length={props.stories.length}
          active={i === props.currentIndex ? 1 : i < props.currentIndex ? 2 : 0}
          isLoaded={props.isLoaded}
          pause={props.pause}
        />
      ))}
    </Animated.View>
  );
};

export default ProgressView;
