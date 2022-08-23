import type { ViewToken } from 'react-native';
import type { StoriesType, StoryContainerProps } from '../StoryView/types';

export interface MultiStoryContainerProps
  extends Omit<StoryContainerProps, 'stories'> {
  stories: StoriesType[];
  onComplete?: () => void;
  userStoryIndex?: number;
  visible?: boolean;
  viewedStories: Array<boolean[]>;
  onChangePosition?: (
    storyIndex: number,
    userIndex?: number
  ) => void | undefined;
}

export interface MultiStoryListItemProps
  extends Omit<StoryContainerProps, 'stories'> {
  item: StoriesType;
  index: number;
  storyIndex: number;
  animatedTransitionStyle: any;
  viewedStories: Array<boolean[]>;
  nextStory?: () => void;
  previousStory?: () => void;
  onComplete?: () => void;
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
}
