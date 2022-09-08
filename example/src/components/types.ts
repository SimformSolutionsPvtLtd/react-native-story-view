import { RefObject } from 'react';
import type { MultiStoryRef, UserProps, CallbackProps } from '../../../src';

export interface HeaderProps extends Partial<CallbackProps>, UserProps {
  multiStoryRef?: RefObject<MultiStoryRef> | null;
}

export interface FooterProps extends Partial<CallbackProps> {}
