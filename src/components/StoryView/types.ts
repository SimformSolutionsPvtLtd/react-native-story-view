import type { FunctionComponentElement, RefObject } from 'react';
import type {
  ImageSourcePropType,
  ImageStyle,
  View,
  ViewStyle,
} from 'react-native';
import type { OnLoadData } from 'react-native-video';
import type { FooterComponentProps } from '../Footer/types';

export enum StroyTypes {
  Image = 'image',
  Video = 'video',
  Text = 'text',
}

export enum ClickPosition {
  Right = 'right',
  Left = 'left',
}

export enum ProgressState {
  Default = 0,
  InProgress = 1,
  Completed = 2,
  Paused = 3,
}

export interface CommonProps {
  images?: Array<string>;
  duration?: number | undefined;
  containerStyle?: ViewStyle;
  enableProgress?: boolean | undefined;
  imageStyle?: ImageStyle;
  barStyle?: BarStyleProps;
  maxVideoDuration?: number | undefined;
}

export interface BarStyleProps {
  barActiveColor?: string;
  barInActiveColor?: string;
  barHeight?: number;
}

export interface ProgressBarCommonProps {
  next?: () => void;
  pause: boolean;
  isLoaded: boolean;
  duration: number;
  currentIndex: number;
  barStyle?: BarStyleProps;
}

export interface ProgressBarProps extends ProgressBarCommonProps {
  active: number;
  index: number;
  length: number;
}

export interface ProgressBarsProps extends ProgressBarCommonProps {
  stories: Array<Object>;
  currentStory: Object;
  length: Array<number>;
  progress: Object;
}

export interface StoryViewProps {
  pause?: boolean;
  onVideoLoaded?: (arg0: OnLoadData) => void;
  onImageLoaded?: () => void;
  stories: StoryType[];
}

export interface StoryViewProps extends CommonProps {
  progressIndex: number;
  viewRef?: RefObject<View>;
}

export interface ProgressiveImageProps {
  thumbnailSource: {
    uri: string;
  };
  imgSource: {
    uri: string;
  };
  viewStyle?: ImageStyle;
  props?: any;
  onImageLoaded?: () => void;
}

export interface StoryContainerProps extends CommonProps {
  stories: StoryType[];
  visible?: boolean | undefined;
  isShowReply?: boolean | undefined;
  headerComponent?: FunctionComponentElement<CommonProps> | undefined;
  userProfile?: UserProps | undefined;
  footerView?: FooterViewProps | undefined;
  footerComponent?: FooterComponentProps;
  onComplete?: Function;
  customView?: FunctionComponentElement<CommonProps> | undefined;
}

export interface UserProps {
  userImage?: ImageSourcePropType | undefined;
  userName?: string | undefined;
  userMessage?: string | undefined;
  imageArrow?: ImageSourcePropType | undefined;
  onImageClick?: Function | undefined;
  onClosePress?: Function | undefined;
}

export interface FooterViewProps {
  isShowReply: boolean | undefined;
  onReplyTextChange: Function | undefined;
  onReplyButtonClick: Function | undefined;
}

export type StoryType = {
  id?: number;
  url?: string;
  type?: string | 'image' | 'video' | 'text';
  duration?: number;
  isReadMore?: boolean;
  isSeen?: boolean;
  isPaused?: boolean;
  created?: string;
  storyId?: number;
  title?: string;
};

export type StoriesType = {
  username?: string;
  profile?: string;
  title?: string;
  id?: number;
  stories?: StoryType[];
};
