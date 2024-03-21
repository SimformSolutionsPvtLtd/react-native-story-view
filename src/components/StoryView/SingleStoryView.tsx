import React, { forwardRef } from 'react';
import useDraggableGesture from '../MultiStoryContainer/hooks/useDraggableGesture';
import StoryContainer from './StoryContainer';
import type { StoryContainerProps, StoryRef } from './types';

const Stories = forwardRef<StoryRef, StoryContainerProps>(
  ({ ...props }: StoryContainerProps, ref) => {
    const onComplete = () => {};
    const onScrollBeginDrag = () => {};
    const onScrollEndDrag = () => {};
    const handleLongPress = (visibility: boolean) => {
      if (typeof ref === 'object') {
        if (ref?.current) {
          ref.current.handleLongPress(visibility);
        }
      }
    };
    const isKeyboardVisible = false;

    const { gestureHandler } = useDraggableGesture({
      backgroundColor: 'black',
      onComplete,
      onScrollBeginDrag,
      onScrollEndDrag,
      handleLongPress,
      isKeyboardVisible,
    });

    return (
      <StoryContainer
        visible={true}
        ref={ref}
        {...props}
        index={0} // userStoryIndex index must be same to pause/play the story
        userStoryIndex={0} // userStoryIndex and index must be same to pause/play the story
        gestureHandler={gestureHandler}
      />
    );
  }
);

export default Stories;
