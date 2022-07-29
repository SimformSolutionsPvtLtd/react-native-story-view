import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolateNode,
  useValue,
} from 'react-native-reanimated';
import { Metrics } from '../../../theme';
import type { ViewConfig } from '../types';

const useMultiStoryContainer = ({ ...props }) => {
  const [storyIndex, setStoryIndex] = useState(props.storyIndex ?? 0);
  const scrollX = useValue(0);
  const previousIndex = useRef(0);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
  });

  const onViewRef = useRef(({ viewableItems }: ViewConfig) => {
    const index = viewableItems?.[0]?.index;
    if (index == null) return;
    /* viewableItems returns array of current/next viewable item
           During story transition current/next or previous/current both visible on screen so array contains both items.
           To consider only next/previous item, checking length is only 1 and it is not previous story.  
        */
    if (viewableItems.length === 1 && index !== previousIndex.current) {
      setStoryIndex(index);
      previousIndex.current = index;
    }
  });

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    { useNativeDriver: true }
  );

  //TODO: Make perfect cube transition and add other transitions
  const animatedTransitionStyle = (index: number) => {
    const width = Metrics.screenWidth;
    const perspective = width;
    const angle = Math.atan(perspective / (width / 2));

    const offset = index * width;
    const inputRange = [
      width * (index - 1),
      width * index,
      width * (index + 1),
    ];

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

  return {
    scrollX,
    onViewRef,
    viewabilityConfig,
    storyIndex,
    setStoryIndex,
    onScroll,
    animatedTransitionStyle,
  };
};

export default useMultiStoryContainer;
