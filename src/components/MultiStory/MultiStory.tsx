import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, FlatList } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
import type { MultiStoryProps, MultiStoryRef } from './types';

const MultiStory = forwardRef<MultiStoryRef, MultiStoryProps>(
  ({ stories, ...props }, ref) => {
    const [isStoryViewVisible, setIsStoryViewShow] = useState<boolean>(false);
    const [pressedIndex, setPressedIndex] = useState<number>(0);

    const openStories = (index: number) => {
      setIsStoryViewShow(true);
      setPressedIndex(index);
    };

    useImperativeHandle(ref, () => ({
      close: () => setIsStoryViewShow(false),
    }));

    return (
      <View>
        <FlatList
          horizontal
          data={stories}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item, index }) => (
            <StoryAvatar {...{ item, index, openStories }} />
          )}
          {...props}
        />
        {isStoryViewVisible && (
          <MultiStoryContainer
            visible={isStoryViewVisible}
            onComplete={() => {
              props?.onComplete?.();
              setIsStoryViewShow(false);
            }}
            {...props?.storyContainerProps}
            stories={stories}
            userStoryIndex={pressedIndex}
          />
        )}
      </View>
    );
  }
);

export default MultiStory;
