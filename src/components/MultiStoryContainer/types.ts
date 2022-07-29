import type { ViewToken } from 'react-native';
import type { StoriesType } from '../StoryView/types';

export interface MultiStoryContainerProps {
  stories: StoriesType[];
  onComplete?: () => void;
  storyIndex?: number;
  visible?: boolean;
  onChangePosition?: (
    storyIndex: number,
    userIndex?: number
  ) => void | undefined;
}

export interface MultiStoryListItemProps {
  item: StoriesType;
  index: number;
  storyIndex: number;
  animatedTransitionStyle: any;
  nextStory?: () => void;
  previousStory?: () => void;
  onComplete?: () => void;
}

export interface ViewConfig {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}
