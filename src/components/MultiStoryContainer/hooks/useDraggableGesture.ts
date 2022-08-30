import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import type { DraggableGestureProps } from '../types';

const useDraggableGesture = ({
  backgroundColor,
  onComplete,
  onScrollBeginDrag,
  onScrollEndDrag,
  handleLongPress,
  isKeyboardVisible,
}: DraggableGestureProps) => {
  const { height, width } = useWindowDimensions();
  const snapPoint: number = Metrics.screenHeight / 2;
  const scrollDragPoint: number = Metrics.screenHeight / 6;
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const isCompleted = useSharedValue<boolean>(false);
  const isDragged = useSharedValue<boolean | undefined>(undefined);
  const isLongPressed = useSharedValue<boolean | undefined>(undefined);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      isLongPressed.value = true;
      if (event.velocityY === 0) return;
      translateX.value = 0;
      translateY.value = event.translationY;
      if (event.translationY > scrollDragPoint) {
        isDragged.value = true;
      }
      if (event.translationY > snapPoint) {
        scale.value = snapPoint / event.translationY;
      }
    },
    onCancel: () => {
      isLongPressed.value = false;
      isDragged.value = false;
    },
    onEnd: event => {
      isLongPressed.value = false;
      isDragged.value = false;
      if (event.translationY < snapPoint) {
        translateX.value = 0;
        translateY.value = 0;
        return;
      }
      scale.value = withTiming(
        0,
        {
          duration: 300,
        },
        () => {
          isCompleted.value = true;
        }
      );
    },
  });

  useAnimatedReaction(
    () => isCompleted.value,
    (value: boolean) => {
      if (value) {
        onComplete && runOnJS(onComplete)();
      }
    }
  );

  const handleScroll = () => {
    if (isDragged.value === undefined) return;
    isDragged.value ? onScrollBeginDrag?.() : onScrollEndDrag?.();
  };

  useAnimatedReaction(
    () => isDragged.value,
    () => {
      if (isKeyboardVisible) return;
      runOnJS(handleScroll)();
    }
  );

  const handleVisibility = () => {
    if (isLongPressed.value === undefined) return;
    handleLongPress?.(isLongPressed.value);
  };

  useAnimatedReaction(
    () => isLongPressed.value,
    () => {
      if (isKeyboardVisible) return;
      runOnJS(handleVisibility)();
    }
  );

  const listAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    backgroundColor: !isDragged.value
      ? backgroundColor ?? Colors.black
      : Colors.transparent,
  }));

  const listStyle = StyleSheet.flatten([styles.list, listAnimatedStyle]);
  const rootStyle = { height, width, backgroundColor: Colors.transparent };

  return {
    listStyle,
    rootStyle,
    gestureHandler,
  };
};

export default useDraggableGesture;
