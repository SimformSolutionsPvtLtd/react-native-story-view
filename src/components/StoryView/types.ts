import type { RefObject } from 'react';
import type {
  ActivityIndicatorProps,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import type {
  OnLoadData,
  OnProgressData,
  VideoProperties,
} from 'react-native-video';

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

export enum StoryMode {
  MultiStory = 'MultiStory',
  SingleStory = 'SingleStory',
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
  storyType?: string;
  videoDuration: number[];
  setVideoDuration: (duration: number[]) => void;
  storyIndex: number;
  currentUserIndex?: number;
}

export interface ProgressBarsProps extends ProgressBarCommonProps {
  stories: StoryType[];
  currentStory: Object;
  videoDuration: number[];
  setVideoDuration: (duration: number[]) => void;
  length: Array<number>;
  progress: Object;
  storyIndex: number;
  index?: number;
}

export interface StoryViewProps {
  pause?: boolean;
  onVideoLoaded?: (arg0: OnLoadData) => void;
  videoDuration: number[];
  onVideoProgress?: (progressData?: OnProgressData) => void;
  onVideoEnd?: () => void;
  onImageLoaded?: () => void;
  stories: StoryType[];
  showSourceIndicator?: boolean;
  sourceIndicatorProps?: ActivityIndicatorProps;
  videoProps?: VideoProperties;
  index?: number;
  storyIndex?: number;
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

export interface CallbackProps {
  userStories?: StoriesType | undefined;
  story?: StoryType[] | undefined;
  progressIndex: number;
  userStoryIndex?: number | undefined;
}

export interface StoryContainerProps extends CommonProps {
  stories: StoryType[];
  userStories?: StoriesType;
  visible?: boolean | undefined;
  index?: number | undefined;
  userStoryIndex?: number | undefined;
  storyIndex?: number | undefined;
  isShowReply?: boolean | undefined;
  renderHeaderComponent?: (callback: CallbackProps) => JSX.Element;
  renderFooterComponent?: (callback: CallbackProps) => JSX.Element;
  userProfile?: UserProps | undefined;
  footerView?: FooterViewProps | undefined;
  onComplete?: (viewedStories?: Array<boolean[]>) => void;
  renderCustomView?: (callback: CallbackProps) => JSX.Element;
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
    progressIndex: number,
    userStoryIndex?: number
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
  userImageStyle?: ImageStyle;
  rootStyle?: ViewStyle;
  userNameStyle?: TextStyle;
  userMessageStyle?: TextStyle;
  closeIconStyle?: ImageStyle;
  customCloseButton?: any;
}

export interface FooterViewProps {
  isShowReply: boolean | undefined;
  onReplyTextChange: Function | undefined;
  onReplyButtonClick: Function | undefined;
}

export type StoryType = {
  id: number;
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
  id: number;
  stories: StoryType[];
};

export type StoryRef = {
  pause: (pause: boolean) => void;
  handleLongPress: (visibility: boolean) => void;
  viewedStories: boolean[];
};
