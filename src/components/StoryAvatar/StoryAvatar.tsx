import React from 'react';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';
import styles from './styles';
import type { StoryAvatarProps } from './types';

const StoryAvatar = ({
  item,
  index,
  openStories,
  viewedStories = [],
  userNameStyle,
  userImageStyle,
  userImageProps,
  viewedStoryContainerStyle,
  userNameProps,
  rootProps,
  containerStyle,
}: StoryAvatarProps) => {
  const isUserStorySeen: boolean = viewedStories?.[index]?.every(
    (val: boolean) => val
  );
  const _userNameStyle = StyleSheet.flatten([styles.username, userNameStyle]);
  const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
  const _containerStyle = StyleSheet.flatten([
    styles.imageContainer,
    containerStyle,
    (isUserStorySeen && viewedStoryContainerStyle) ??
      styles.viewedStoryContainer,
  ]);

  return (
    <Pressable onPress={() => openStories?.(index!)} {...rootProps}>
      <View style={_containerStyle}>
        <Image
          resizeMode="cover"
          source={{ uri: item?.profile }}
          style={_userImageStyle}
          {...userImageProps}
        />
      </View>
      <Text style={_userNameStyle} {...userNameProps}>
        {item?.username}
      </Text>
    </Pressable>
  );
};
export default StoryAvatar;
