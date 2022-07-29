import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
import styles from './styles';
import type { MultiStoryProps } from './types';

const MultiStory = ({ stories, ...props }: MultiStoryProps) => {
  const [isStoryViewShow, setIsStoryViewShow] = useState<boolean>(false);
  const [pressedIndex, setPressedIndex] = useState<number>(0);

  const openStories = (index: number) => {
    setIsStoryViewShow(true);
    setPressedIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={stories}
        keyExtractor={item => item.id!.toString()}
        renderItem={({ item, index }) => {
          return <StoryAvatar {...{ item, index, openStories }} />;
        }}
        {...props}
      />
      {isStoryViewShow && (
        <MultiStoryContainer
          visible={isStoryViewShow}
          onComplete={() => {
            setIsStoryViewShow(false);
          }}
          storyIndex={pressedIndex}
          stories={stories}
        />
      )}
    </View>
  );
};

export default MultiStory;
