import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, FlatList } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
import type { StoryType } from '../StoryView';
import type { MultiStoryProps, MultiStoryRef } from './types';

const MultiStory = forwardRef<MultiStoryRef, MultiStoryProps>(
  ({ stories, avatarProps, ...props }, ref) => {
    const [isStoryViewVisible, setIsStoryViewShow] = useState<boolean>(false);
    const [pressedIndex, setPressedIndex] = useState<number>(0);

    const openStories = (index: number) => {
      setIsStoryViewShow(true);
      setPressedIndex(index);
    };

    const viewedStories = Array(stories.length)
      .fill(stories)
      .map((row, index) =>
        row?.[index]?.stories.map((item: StoryType) => item?.isSeen ?? false)
      );

    useImperativeHandle(ref, () => ({
      close: _onClose,
    }));

    const _onClose = () => {
      setIsStoryViewShow(false);
      props?.onComplete?.(viewedStories);
    };

    return (
      <View>
        <FlatList
          horizontal
          data={stories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item, index }) => (
            <StoryAvatar
              {...{ item, index, openStories, viewedStories, ...avatarProps }}
            />
          )}
          {...props}
        />
        {isStoryViewVisible && (
          <MultiStoryContainer
            visible={isStoryViewVisible}
            onComplete={_onClose}
            viewedStories={[...viewedStories]}
            onChangePosition={(progressIndex, storyIndex: any) => {
              viewedStories[storyIndex][progressIndex] = true;
              props?.onChangePosition?.(progressIndex, storyIndex);
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
