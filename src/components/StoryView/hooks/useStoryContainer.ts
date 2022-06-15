import { useState } from 'react';
import type { NativeTouchEvent } from 'react-native';
import type { OnLoadData } from 'react-native-video';
import { Metrics } from '../../../theme';
import { ClickPosition, StoryContainerProps } from '../types';

const useAuth = (props: StoryContainerProps) => {
  const [progressIndex, setProgressIndex] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPause, setPause] = useState(false);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length: OnLoadData) => {
    setLoaded(true);
    setDuration(props?.maxVideoDuration ?? length?.duration);
  };

  const changeStory = (evt: NativeTouchEvent) => {
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
        setProgressIndex(position);
      } else {
        if (typeof props.onComplete === 'function') {
          props?.onComplete();
        }
      }
    }
  };

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
  };
};

export default useAuth;
