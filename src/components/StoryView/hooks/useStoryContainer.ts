import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AppState,
  AppStateStatus,
  Keyboard,
  NativeTouchEvent,
  StyleSheet,
} from 'react-native';
import type { OnLoadData, OnProgressData } from 'react-native-video';
import { useKeyboardListener } from '../../../hooks';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import {
  ClickPosition,
  StoryContainerProps,
  StoryMode,
  StroyTypes,
} from '../types';

const useStoryContainer = (
  { onChangePosition, ...props }: StoryContainerProps,
  viewedStories: MutableRefObject<boolean[]>
) => {
  const [progressIndex, setProgressIndex] = useState(props?.progressIndex ?? 0);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPause, setPause] = useState(true);
  const [visibleElements, setVisibleElements] = useState(true);
  const appState = useRef(AppState.currentState);
  const storyMode: StoryMode = props?.userStoryIndex
    ? StoryMode.MultiStory
    : StoryMode.SingleStory;
  const storyCount = props?.stories?.length ?? 0;
  const [videoDuration, setVideoDuration] = useState<number[]>(
    Array(storyCount).fill(0)
  );

  const isKeyboardVisible = useKeyboardListener();

  useEffect(() => {
    if (props?.index === props?.userStoryIndex) {
      setPause(isKeyboardVisible);
    }
  }, [isKeyboardVisible, props?.index, props?.userStoryIndex]);

  // progress index change callback
  useEffect(() => {
    if (props?.index === props?.userStoryIndex) {
      onChangePosition?.(progressIndex, props?.userStoryIndex);
      if (storyMode === StoryMode.SingleStory) {
        viewedStories.current[progressIndex] = true;
      }
    }
  }, [
    storyMode,
    viewedStories,
    props?.index,
    props?.userStoryIndex,
    progressIndex,
    onChangePosition,
  ]);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  useEffect(() => {
    const isStoryNotFocused = props?.index !== props?.userStoryIndex;
    setPause(isStoryNotFocused);
  }, [props?.userStoryIndex, props?.index]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    const isBackgroundState =
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active';

    if (props?.index !== props?.userStoryIndex) return;
    setPause(isBackgroundState === null ? false : !isBackgroundState);
  };

  const appStateChange = useCallback(handleAppStateChange, [
    props?.index,
    props?.userStoryIndex,
  ]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', appStateChange);
    return () => subscription.remove();
  }, [appStateChange]);

  const setEmptyDurations = useCallback(() => {
    setVideoDuration(Array(storyCount).fill(0));
  }, [storyCount]);

  /* force reset video durations on user story change */
  useEffect(() => {
    if (props?.stories[progressIndex]?.type === StroyTypes.Video) {
      if (props?.index === props?.userStoryIndex) {
        setEmptyDurations();
      }
    }
  }, [
    setEmptyDurations,
    props?.index,
    progressIndex,
    props?.stories,
    props?.userStoryIndex,
    storyCount,
  ]);

  const onVideoLoaded = (length: OnLoadData) => {
    setPause(false);
    setDuration(props?.maxVideoDuration ?? length?.duration);
  };

  const onVideoEnd = () => {
    if (props?.index === props?.userStoryIndex) {
      const videoDurations = [...videoDuration];
      videoDurations[progressIndex] = duration + 1;
      setVideoDuration([...videoDurations]);
      return;
    }
  };

  const onVideoProgress = (progressData?: OnProgressData) => {
    const videoDurations = [...videoDuration];
    videoDurations[progressIndex] = progressData?.currentTime ?? 0;
    setVideoDuration([...videoDurations]);
    !isLoaded && setLoaded(true);
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
    if (props?.userStoryIndex !== props?.index) return;
    switch (type) {
      case ClickPosition.Left:
        onChange(progressIndex - 1);
        break;
      case ClickPosition.Right:
        onChange(
          progressIndex < props?.stories?.length
            ? progressIndex + 1
            : progressIndex
        );
        break;
    }
  };

  const onChange = (position: number) => {
    if (isPause) return;
    if (
      position >= props?.stories?.length &&
      props?.userStoryIndex !== undefined
    ) {
      props?.nextStory?.();
    } else if (position < 0) {
      props?.previousStory?.();
    } else if (position < props?.stories.length) {
      setProgressIndex(position);
    } else {
      props?.onComplete?.();
    }
  };

  const onStoryPressHold = () => {
    setVisibleElements(false);
    setPause(true);
  };

  const onStoryPressRelease = () => {
    if (isPause && !visibleElements) {
      setVisibleElements(true);
      setPause(false);
    }
  };

  const rootStyle = StyleSheet.flatten([
    styles.container,
    {
      backgroundColor: props?.backgroundColor ?? Colors.black,
    },
    props?.style,
  ]);
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
    videoDuration,
    setPause,
    setLoaded,
    setDuration,
    onImageLoaded,
    onVideoLoaded,
    onVideoProgress,
    onVideoEnd,
    changeStory,
    onArrowClick,
    onStoryPressHold,
    setVideoDuration,
    onStoryPressRelease,
    isKeyboardVisible,
    opacity: visibleElements ? 1 : 0,
    rootStyle,
    containerStyle,
  };
};

export default useStoryContainer;
