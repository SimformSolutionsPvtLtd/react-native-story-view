import type { FlatListProps } from 'react-native';
import type { TransitionMode } from '../MultiStoryContainer/types';
import type { StoryAvatarStyleProps } from '../StoryAvatar/types';
import type { StoriesType, StoryContainerProps } from '../StoryView/types';

export interface MultiStoryProps extends Partial<FlatListProps<any>> {
  stories: StoriesType[];
  onComplete?: (viewedStories?: Array<boolean[]>) => void;
  onChangePosition?: (progressIndex: number, storyIndex: number) => void;
  avatarProps?: StoryAvatarStyleProps;
  viewedStories?: Array<boolean[]>;
  storyContainerProps?: Omit<StoryContainerProps, 'stories'>;
  transitionMode?: TransitionMode;
}

export interface MultiStoryRef {
  close: () => void;
}
