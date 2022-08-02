import React, { useRef } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMultiStoryContainer } from './hooks';
import { StoryContainer, UserHeaderView } from '../StoryView';
import { Footer } from '../Footer';
import { Metrics } from '../../theme';
import styles from './styles';
import type {
  MultiStoryContainerProps,
  MultiStoryListItemProps,
} from './types';

const MultiStoryListItem = ({
  item,
  index,
  animatedTransitionStyle,
  nextStory,
  previousStory,
  storyIndex,
  onComplete,
  ...props
}: MultiStoryListItemProps) => {
  return (
    <Animated.View key={item.id} style={styles.itemContainer}>
      <Animated.View style={animatedTransitionStyle(index)}>
        <StoryContainer
          visible={true}
          userStories={item}
          nextStory={nextStory}
          previousStory={previousStory}
          stories={item.stories}
          progressIndex={0}
          maxVideoDuration={15}
          renderHeaderComponent={() => (
            <UserHeaderView
              userImage={{ uri: item.profile ?? '' }}
              userName={item.username}
              userMessage={item.title}
              onClosePress={() => {
                onComplete?.();
              }}
            />
          )}
          renderFooterComponent={() => <Footer />}
          {...props}
          index={index}
          userStoryIndex={storyIndex}
        />
      </Animated.View>
    </Animated.View>
  );
};

const MultiStoryContainer = ({
  stories,
  visible,
  onComplete,
  ...props
}: MultiStoryContainerProps) => {
  const flatListRef = useRef<any>(null);

  const {
    storyIndex,
    onViewRef,
    viewabilityConfig,
    animatedTransitionStyle,
    onScroll,
  } = useMultiStoryContainer(props);

  if (!visible) return null;

  const nextStory = () => {
    if (storyIndex + 1 === stories.length) {
      onComplete?.();
      return;
    }
    if (storyIndex >= stories.length - 1) return;
    flatListRef.current?.scrollToIndex({
      index: storyIndex + 1,
      animated: true,
    });
  };

  const previousStory = () => {
    if (storyIndex === 0) return;
    flatListRef.current?.scrollToIndex({
      index: storyIndex - 1,
      animated: true,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={() => onComplete?.()}>
      <SafeAreaView style={styles.container}>
        <Animated.FlatList
          horizontal
          pagingEnabled
          data={stories}
          ref={flatListRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          initialScrollIndex={storyIndex}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(_, index) => ({
            length: Metrics.screenWidth,
            offset: Metrics.screenWidth * index,
            index,
          })}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewabilityConfig.current}
          decelerationRate={Metrics.isIOS ? 0.99 : 0.92}
          keyExtractor={item => item.title + item.id!.toString()}
          contentContainerStyle={{
            width: Metrics.screenWidth * stories.length,
          }}
          extraData={storyIndex}
          renderItem={({ item, index }) => (
            <MultiStoryListItem
              {...{
                item,
                index,
                animatedTransitionStyle,
                nextStory,
                previousStory,
                storyIndex,
                onComplete,
              }}
              {...props}
            />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default MultiStoryContainer;
