import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { Footer as StoryFooter } from 'react-native-story-view';
import { Strings } from '../constants';
import { FooterProps } from './types';

const Footer = ({ userStories, story, progressIndex }: FooterProps) => (
  <StoryFooter
    onSendTextPress={() => {
      Alert.alert(
        `${Strings.messageSent} ${userStories?.username} id ${
          story?.[progressIndex!].id
        }`
      );
      Keyboard.dismiss();
    }}
  />
);

export default Footer;
