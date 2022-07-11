import { useEffect, useState } from 'react';
import { Keyboard, NativeTouchEvent, StyleSheet } from 'react-native';
import type { OnLoadData } from 'react-native-video';
import { useKeyboardListener } from '../../../hooks';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import { ClickPosition, StoryContainerProps } from '../types';

const useStoryContainer = (props: StoryContainerProps) => {
  const [progressIndex, setProgressIndex] = useState(props?.progressIndex ?? 0);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPause, setPause] = useState(false);
  const [visibleElements, setVisibleElements] = useState(true);

  const isKeyboardVisible = useKeyboardListener();

  useEffect(() => {
    setPause(isKeyboardVisible);
  }, [isKeyboardVisible]);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length: OnLoadData) => {
    setLoaded(true);
    setDuration(props?.maxVideoDuration ?? length?.duration);
  };

  const changeStory = (evt: NativeTouchEvent) => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
      return;
    }
    if (evt.locationX > Metrics.screenWidth / 2) {
      onArrowClick(ClickPosition.Right);
    } else {
      onArrowClick(ClickPosition.Left);
    }
  };

  const onArrowClick = (type: string) => {
    switch (type) {
      case ClickPosition.Left:
        onChange(progressIndex === 0 ? progressIndex : progressIndex - 1);
        break;
      case ClickPosition.Right:
        onChange(
          progressIndex < props.stories.length
            ? progressIndex + 1
            : progressIndex
        );
        break;
    }
  };

  const onChange = (position: number) => {
    if (!isPause) {
      if (position < props.stories.length) {
        props?.onChangePosition?.(position);
        setProgressIndex(position);
      } else {
        if (typeof props.onComplete === 'function') {
          props?.onComplete();
        }
      }
    }
  };

  const onStoryPressHold = () => {
    setVisibleElements(false);
    setPause(true);
  };

  const onStoryPressRelease = () => {
    setVisibleElements(true);
    setPause(false);
  };

  const rootStyle = StyleSheet.flatten([styles.container, props?.style]);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    {
      backgroundColor: props?.backgroundColor ?? Colors.black,
    },
  ]);

  return {
    isPause,
    progressIndex,
    isLoaded,
    duration,
    setPause,
    setLoaded,
    setDuration,
    onImageLoaded,
    onVideoLoaded,
    changeStory,
    onArrowClick,
    onStoryPressHold,
    onStoryPressRelease,
    isKeyboardVisible,
    opacity: visibleElements ? 1 : 0,
    rootStyle,
    containerStyle,
  };
};

export default useStoryContainer;
