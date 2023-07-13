import { StyleSheet } from 'react-native';
import { Extrapolate, interpolate } from 'react-native-reanimated';
import { Metrics } from '../../../theme';
import type { ScrollValue } from '../types';

//TODO: Make perfect cube transition
export const cubeTransition = (index: number, scrollX: ScrollValue) => {
  'worklet';
  const width = Metrics.screenWidth;
  const perspective = width;
  const angle = Math.atan(perspective / (width / 2));

  const offset = index * width;
  const inputRange = [width * (index - 1), width * index, width * (index + 1)];

  const translateX = interpolate(
    scrollX.value,
    inputRange,
    [0, 0, 0],
    Extrapolate.CLAMP
  );

  const scale = interpolate(scrollX.value, inputRange, [0.79, 1, 0.78]);

  const rotateY = interpolate(
    scrollX.value,
    [offset - width, offset + width],
    [angle, -angle],
    Extrapolate.CLAMP
  );

  return {
    ...StyleSheet.absoluteFillObject,
    transform: [
      { perspective },
      { translateX },
      { rotateY: `${rotateY}rad` },
      { scale },
    ],
  };
};

export const scaleTransition = (index: number, scrollX: ScrollValue) => {
  'worklet';
  const width = Metrics.screenWidth;
  const perspective = width;
  const inputRange = [width * (index - 1), width * index, width * (index + 1)];
  const scale = interpolate(scrollX.value, inputRange, [0.79, 1, 0.78]);

  return {
    ...StyleSheet.absoluteFillObject,
    transform: [{ perspective }, { scale }],
  };
};

export const defaultTransition = () => ({ ...StyleSheet.absoluteFillObject });
