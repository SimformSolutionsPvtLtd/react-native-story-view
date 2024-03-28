import React from 'react';
import { Alert, Keyboard, Platform, StyleSheet, View } from 'react-native';
import { Footer as StoryFooter } from 'react-native-story-view';
import { Strings } from '../constants';
import { FooterProps } from './types';

const Footer = ({ userStories, story, progressIndex }: FooterProps) => (
  <View style={styles.container}>
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
  </View>
);

const styles = StyleSheet.create({
  container: { bottom: Platform.OS === 'android' ? 50 : 0 }
});

export default Footer;
