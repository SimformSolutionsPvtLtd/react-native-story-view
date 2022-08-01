import type { FlatListProps } from 'react-native';
import type { StoriesType, StoryContainerProps } from '../StoryView/types';

export interface MultiStoryProps extends Partial<FlatListProps<any>> {
  stories: StoriesType[];
  onComplete?: () => void;
  onChangePosition?: (progressIndex: number, storyIndex: number) => void;
  storyContainerProps?: Omit<StoryContainerProps, 'stories'>;
}

export interface MultiStoryRef {
  close: () => void;
}
