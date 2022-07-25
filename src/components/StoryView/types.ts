import type { FunctionComponentElement, RefObject } from 'react';
import type {
  ActivityIndicatorProps,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type { OnLoadData, VideoProperties } from 'react-native-video';
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
  progressBarStyle?: ViewStyle | undefined;
}

export interface ProgressBarProps extends ProgressBarCommonProps {
  active: number;
  index: number;
  length: number;
  storyIndex: number;
}

export interface ProgressBarsProps extends ProgressBarCommonProps {
  stories: Array<Object>;
  currentStory: Object;
  length: Array<number>;
  progress: Object;
  storyIndex: number;
  index?: number;
}

export interface StoryViewProps {
  pause?: boolean;
  onVideoLoaded?: (arg0: OnLoadData) => void;
  onImageLoaded?: () => void;
  stories: StoryType[];
  showSourceIndicator?: boolean;
  sourceIndicatorProps?: ActivityIndicatorProps;
  videoProps?: VideoProperties;
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
  index?: number | undefined;
  storyIndex?: number | undefined;
  isShowReply?: boolean | undefined;
  headerComponent?: FunctionComponentElement<CommonProps> | undefined;
  userProfile?: UserProps | undefined;
  footerView?: FooterViewProps | undefined;
  footerComponent?: FooterComponentProps;
  onComplete?: Function;
  customView?: FunctionComponentElement<CommonProps> | undefined;
  backgroundColor?: string;
  style?: ViewStyle;
  progressIndex?: number | undefined;
  headerViewProps?: ViewProps;
  customViewProps?: ViewProps;
  footerViewProps?: ViewProps;
  progressViewProps?: ViewProps;
  storyContainerViewProps?: ViewProps;
  showSourceIndicator?: boolean;
  sourceIndicatorProps?: ActivityIndicatorProps;
  videoProps?: VideoProperties;
  onChangePosition?: (
    storyIndex: number,
    userIndex?: number
  ) => void | undefined;
  previousStory?: () => void | undefined;
  nextStory?: () => void;
}

export interface UserProps {
  containerStyle?: ViewStyle | undefined;
  userImage?: ImageSourcePropType | undefined;
  userName?: string | undefined;
  userMessage?: string | undefined;
  imageArrow?: ImageSourcePropType | undefined;
  onImageClick?: Function | undefined;
  onClosePress?: Function | undefined;
  userImageProps?: ImageProps | undefined;
  closeIconProps?: ImageProps | undefined;
  userNameProps?: TextProps | undefined;
  userMessageProps?: TextProps | undefined;
  customCloseButton?: any;
}

export interface FooterViewProps {
  isShowReply: boolean | undefined;
  onReplyTextChange: Function | undefined;
  onReplyButtonClick: Function | undefined;
}

export type StoryType = {
  id?: number;
  url?: string;
  thumbnail?: string;
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
  stories: StoryType[];
};
