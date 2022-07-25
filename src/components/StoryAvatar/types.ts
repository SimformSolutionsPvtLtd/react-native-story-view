import type { StoriesType } from '../StoryView/types';

export interface StoryAvatarProps {
  item?: StoriesType;
  index?: number;
  openStories?: (position: number) => void;
}
