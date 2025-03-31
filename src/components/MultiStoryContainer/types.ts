import type { ViewToken } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { GestureHandlerEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook';
import type {
  StoriesType,
  StoryContainerProps,
  StoryType,
} from '../StoryView/types';

export enum TransitionMode {
  Default,
  Cube,
  Scale,
}

export interface MultiStoryContainerProps
  extends Omit<StoryContainerProps, 'stories'> {
  stories: StoriesType[];
  onComplete?: () => void;
  onUserStoryIndexChange?: (index: number) => void;
  userStoryIndex?: number;
  visible?: boolean;
  viewedStories: Array<boolean[]>;
  pointers?: { pageX: number; pageY: number };
  onChangePosition?: (
    storyIndex: number,
    userIndex?: number
  ) => void | undefined;
  transitionMode?: TransitionMode;
}

export interface MultiStoryListItemProps
  extends Omit<StoryContainerProps, 'stories'> {
  item: StoriesType;
  index: number;
  storyIndex: number;
  viewedStories: Array<boolean[]>;
  nextStory?: () => void;
  previousStory?: () => void;
  onComplete?: () => void;
  transitionMode?: TransitionMode;
  scrollX: ScrollValue;
  isTransitionActive: boolean;
  flatListRef: any;
  storyLength: number;
  gestureHandler?: (e: GestureHandlerEvent<any>) => void;
  isInitialStory?: boolean;
  renderOverlayView?: (item: StoryType) => JSX.Element;
  overlayViewPostion?: 'top' | 'bottom' | 'middle';
}

export interface ViewConfig {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

export interface ListItemProps {
  item: StoriesType;
  index: number;
}

export interface ListItemRef {
  handleLongPress: (visibility: boolean) => void;
  pause: (pauseState: boolean) => void;
  setMuted: (muteState: boolean) => void;
  onScrollBegin: () => void;
  onScrollEnd: () => void;
}

export interface DraggableGestureProps {
  backgroundColor?: string;
  onComplete?: () => void;
  handleLongPress: (visibility: boolean) => void;
  isKeyboardVisible: boolean;
  isScrollActive: boolean;
  pointers?: PointerType;
}

export type ViewableItemsRef = {
  index: number | null;
  length: number;
} | null;
export type ScrollValue = SharedValue<number>;

export type PointerType = { pageX: number; pageY: number };
