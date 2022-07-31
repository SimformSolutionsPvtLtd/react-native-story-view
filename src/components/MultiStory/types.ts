import type { StoriesType, StoryContainerProps } from '../StoryView/types';
export interface MultiStoryProps extends StoryContainerProps {
  stories: StoriesType[];
  storyContainerProps?: Omit<StoryContainerProps, 'stories'>;
}

export interface MultiStoryRef {
  close: () => void;
}
