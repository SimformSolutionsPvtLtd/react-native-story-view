import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import useCircleAnimation from './hooks/useCircleAnimation';
import styles from './styles';
import type { StoryAvatarProps } from './types';

const StoryAvatar = ({
  item,
  index,
  pressedIndex,
  isStoryViewVisible,
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

  const { avatarAnimatedStyle } = useCircleAnimation({
    pressedIndex,
    index,
    isStoryViewVisible,
  });

  return (
    <Pressable onPress={() => openStories?.(index)} {...rootProps}>
      <View style={_containerStyle}>
        <Animated.Image
          resizeMode="cover"
          source={{ uri: item?.profile }}
          style={[_userImageStyle, avatarAnimatedStyle]}
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
