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
  item?: StoriesType;
  index: number;
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
