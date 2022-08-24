import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolateNode,
} from 'react-native-reanimated';
import { Metrics } from '../../../theme';
import type { ScrollValue } from '../types';

//TODO: Make perfect cube transition
export const cubeTransition = (index: number, scrollX: ScrollValue) => {
  const width = Metrics.screenWidth;
  const perspective = width;
  const angle = Math.atan(perspective / (width / 2));

  const offset = index * width;
  const inputRange = [width * (index - 1), width * index, width * (index + 1)];

  const translateX = interpolateNode(scrollX, {
    inputRange,
    outputRange: [0, 0, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolateNode(scrollX, {
    inputRange,
    outputRange: [0.79, 1, 0.78],
  });

  const rotateY = interpolateNode(scrollX, {
    inputRange: [offset - width, offset + width],
    outputRange: [angle, -angle],
    extrapolate: Extrapolate.CLAMP,
  });

  return {
    ...StyleSheet.absoluteFillObject,
    transform: [
      { perspective },
      { translateX },
      { rotateY: Animated.concat(rotateY, 'rad') },
      { scale },
    ],
  };
};

export const scaleTransition = (index: number, scrollX: ScrollValue) => {
  const width = Metrics.screenWidth;
  const perspective = width;
  const inputRange = [width * (index - 1), width * index, width * (index + 1)];

  const scale = interpolateNode(scrollX, {
    inputRange,
    outputRange: [0.79, 1, 0.78],
  });

  return {
    ...StyleSheet.absoluteFillObject,
    transform: [{ perspective }, { scale }],
  };
};

export const defaultTransition = () => ({ ...StyleSheet.absoluteFillObject });
