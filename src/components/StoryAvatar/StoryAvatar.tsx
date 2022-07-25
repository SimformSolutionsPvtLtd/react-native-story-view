import React from 'react';
import { View, Pressable, Image } from 'react-native';
import styles from './styles';
import type { StoryAvatarProps } from './types';

const StoryAvatar = ({ item, index, openStories }: StoryAvatarProps) => (
  <Pressable onPress={() => openStories?.(index!)}>
    <View style={styles.imageContainer}>
      <Image
        resizeMode="contain"
        source={{ uri: item?.profile }}
        style={styles.image}
      />
    </View>
  </Pressable>
);
export default StoryAvatar;
