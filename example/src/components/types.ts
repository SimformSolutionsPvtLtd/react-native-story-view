import { RefObject } from 'react';
import type {
  StoriesType,
  MultiStoryRef,
  UserProps,
} from 'react-native-story-view';

interface CallbackProps {
  userStories?: StoriesType;
  progressIndex?: number;
  userStoryIndex?: number;
}

export interface HeaderProps extends CallbackProps, UserProps {
  multiStoryRef?: RefObject<MultiStoryRef> | null;
}

export interface FooterProps extends CallbackProps {}
