import React from 'react';
import { Keyboard } from 'react-native';
import { Footer as StoryFooter } from 'react-native-story-view';
import { FooterProps } from './types';

const Footer = ({ userStories }: FooterProps) => (
  <StoryFooter onSendTextPress={() => Keyboard.dismiss()} />
);

export default Footer;
