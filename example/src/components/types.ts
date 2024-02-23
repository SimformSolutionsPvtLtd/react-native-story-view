import { RefObject } from 'react';
import type { StoryViewRef, UserProps, CallbackProps } from '../../../src';

export interface HeaderProps extends Partial<CallbackProps>, UserProps {
  StoryViewRef?: RefObject<StoryViewRef> | null;
}

export interface FooterProps extends Partial<CallbackProps> {}
