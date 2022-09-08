import type {
  ImageProps,
  ImageStyle,
  PressableProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { StoriesType } from '../StoryView/types';

export interface StoryAvatarProps extends StoryAvatarStyleProps {
  index: number;
  item?: StoriesType;
  pressedIndex?: number;
  isStoryViewVisible?: boolean;
  viewedStories?: Array<boolean[]>;
  openStories?: (position: number) => void;
}

export interface StoryAvatarStyleProps {
  userNameStyle?: TextStyle;
  userImageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  userImageProps?: ImageProps;
  userNameProps?: TextProps;
  rootProps?: PressableProps;
  viewedStoryContainerStyle?: ViewStyle;
}

export interface CircleAnimationProps {
  index: number;
  pressedIndex?: number;
  isStoryViewVisible?: boolean;
}
