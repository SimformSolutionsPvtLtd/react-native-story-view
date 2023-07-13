import React, { useRef, useState } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import {
  StoryAvatar,
  StoryContainer,
  StoryRef,
  StoryType
} from 'react-native-story-view';
import { Footer, Header } from '../../components';
import { stories } from '../../constants';
import styles from './styles';

const StoryScreen = () => {
  const [isStoryViewVisible, setIsStoryViewShow] = useState<boolean>(false);
  const ref = useRef<StoryRef>(null);
  const index = 0;
  const [userStories, setUserStories] = useState(
    JSON.parse(JSON.stringify(stories[index]))
  );

  const viewedStories = useRef(
    Array(userStories.stories.length)
      .fill(userStories.stories)
      .map((item, index) => item[index].isSeen ?? false)
  );

  const openStories = () => {
    setIsStoryViewShow(true);
  };

  const closeStory = () => {
    viewedStories.current = ref?.current?.viewedStories ?? [];
    const clonedUserStories = { ...userStories };
    clonedUserStories.stories.map((item: StoryType, index: number) => {
      item.isSeen = viewedStories.current?.[index] ?? false;
    });
    setUserStories({ ...clonedUserStories });
    setIsStoryViewShow(false);
  };

  const storyInitialIndex: number = viewedStories?.current?.findIndex(
    (val: boolean) => !val
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storyAvatarContainer}>
        <StoryAvatar
          {...{
            openStories,
            index,
            item: userStories,
            viewedStories: [viewedStories.current]
          }}
        />
      </View>
      <Modal
        visible={isStoryViewVisible}
        statusBarTranslucent={true}
        onRequestClose={closeStory}>
        <SafeAreaView style={styles.storyContainer}>
          <StoryContainer
            visible
            ref={ref}
            progressIndex={storyInitialIndex < 0 ? 0 : storyInitialIndex}
            stories={userStories.stories}
            maxVideoDuration={10}
            renderHeaderComponent={({ progressIndex }) => (
              <Header userStories={userStories} onClosePress={closeStory} />
            )}
            renderFooterComponent={({ progressIndex, story }) => (
              <Footer userStories={userStories} {...{ story, progressIndex }} />
            )}
            //Callback when status view completes
            onComplete={closeStory}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default StoryScreen;
