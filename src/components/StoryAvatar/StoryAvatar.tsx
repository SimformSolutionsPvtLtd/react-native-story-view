import React from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import styles from './styles';
import type { StoryAvatarProps } from './types';

const StoryAvatar = ({ item, index, openStories }: StoryAvatarProps) => (
  <Pressable onPress={() => openStories?.(index!)}>
    <View style={styles.imageContainer}>
      <Image
        resizeMode="cover"
        source={{ uri: item?.profile }}
        style={styles.image}
      />
    </View>
    <Text style={styles.username}>{item?.username}</Text>
  </Pressable>
);
export default StoryAvatar;
