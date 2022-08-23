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
import type { OnLoadData } from 'react-native-video';
import { useKeyboardListener } from '../../../hooks';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import { ClickPosition, StoryContainerProps, StoryMode } from '../types';

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
