import type { FlatListProps } from 'react-native';
import type { TransitionMode, ListItemRef } from '../MultiStoryContainer/types';
import type { StoryAvatarStyleProps } from '../StoryAvatar/types';
import type {
  StoriesType,
  StoryContainerProps,
  StoryType,
} from '../StoryView/types';

export interface MultiStoryBaseProps extends Partial<FlatListProps<any>> {
  stories: StoriesType[];
  onComplete?: (viewedStories?: Array<boolean[]>) => void;
  onChangePosition?: (progressIndex: number, storyIndex: number) => void;
  avatarProps?: StoryAvatarStyleProps;
  viewedStories?: Array<boolean[]>;
  storyContainerProps?: Omit<StoryContainerProps, 'stories'>;
  transitionMode?: TransitionMode;
  renderOverlayView?: (item: StoryType) => JSX.Element;
  overlayViewPostion?: 'top' | 'bottom' | 'middle';
}

export interface OverlayViewMultiStoryProps extends MultiStoryBaseProps {
  renderOverlayView: (item: StoryType) => JSX.Element;
  overlayViewPostion: 'top' | 'bottom' | 'middle';
}

export interface MultiStoryMainProps extends MultiStoryBaseProps {
  renderOverlayView?: never;
  overlayViewPostion?: never;
}

export type MultiStoryProps = MultiStoryMainProps | OverlayViewMultiStoryProps;

export interface MultiStoryRef extends ListItemRef {
  close: () => void;
}
