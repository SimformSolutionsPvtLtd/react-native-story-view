import React from 'react';
import { ProfileHeader } from 'react-native-story-view';
import { HeaderProps } from './types';

const Header = ({ userStories, multiStoryRef, ...props }: HeaderProps) => (
  <ProfileHeader
    userImage={{ uri: userStories?.profile ?? '' }}
    userName={userStories?.username}
    userMessage={userStories?.title}
    onClosePress={() => {
      multiStoryRef?.current?.close?.();
    }}
    {...props}
  />
);

export default Header;
