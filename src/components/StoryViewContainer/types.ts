import type { ViewToken } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { GestureHandlerEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook';
import type { StoriesType, StoryContainerProps } from '../StoryView/types';

export enum TransitionMode {
  Default,
  Cube,
  Scale,
}

export interface StoryViewContainerProps
  extends Omit<StoryContainerProps, 'stories'> {
  stories: StoriesType[];
  onComplete?: () => void;
  onUserStoryIndexChange?: (index: number) => void;
  userStoryIndex?: number;
  visible?: boolean;
  viewedStories: Array<boolean[]>;
  onChangePosition?: (
    storyIndex: number,
    userIndex?: number
  ) => void | undefined;
  transitionMode?: TransitionMode;
}

export interface StoryViewListItemProps
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
  gestureHandler?: (e: GestureHandlerEvent<any>) => void;
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
  onScrollBegin: () => void;
  onScrollEnd: () => void;
  handleLongPress: (visibility: boolean) => void;
}

export interface DraggableGestureProps {
  backgroundColor?: string;
  onComplete?: () => void;
  onScrollBeginDrag: () => void;
  onScrollEndDrag: () => void;
  handleLongPress: (visibility: boolean) => void;
  isKeyboardVisible: boolean;
}

export type ScrollValue = SharedValue<number>;
