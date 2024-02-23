import { useEffect, useRef, useState } from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useKeyboardListener } from '../../../hooks';
import type {
  StoryViewContainerProps,
  ScrollValue,
  ViewConfig,
} from '../types';
import useDraggableGesture from './useDraggableGesture';

const useStoryViewContainer = (
  flatListRef: any,
  { userStoryIndex, backgroundColor }: Partial<StoryViewContainerProps>,
  onScrollBeginDrag: () => void,
  onScrollEndDrag: () => void,
  handleLongPress: (visibility: boolean) => void,
  onComplete?: () => void
) => {
  const [storyIndex, setStoryIndex] = useState(userStoryIndex ?? 0);
  const scrollX: ScrollValue = useSharedValue(0);
  const previousIndex = useRef<number>(0);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  });
  const isKeyboardVisible = useKeyboardListener();
  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    flatListRef?.current?.setNativeProps({ scrollEnabled: !isKeyboardVisible });
  }, [flatListRef, isKeyboardVisible]);

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

  const { listStyle, rootStyle, gestureHandler } = useDraggableGesture({
    backgroundColor,
    onComplete,
    onScrollBeginDrag,
    onScrollEndDrag,
    handleLongPress,
    isKeyboardVisible,
  });

  return {
    scrollX,
    onViewRef,
    viewabilityConfig,
    listStyle,
    rootStyle,
    storyIndex,
    gestureHandler,
    setStoryIndex,
    onScroll,
  };
};

export default useStoryViewContainer;
