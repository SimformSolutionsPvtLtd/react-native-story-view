import React, { useState } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { Footer, Header } from '../../components';
import { StoryAvatar, StoryContainer } from '../../../../src';
import { stories } from '../../constants';
import styles from './styles';

const StoryScreen = () => {
  const [isStoryViewVisible, setIsStoryViewShow] = useState<boolean>(false);
  const index = 0;
  const openStories = () => {
    setIsStoryViewShow(true);
  };
  const closeStory = () => {
    setIsStoryViewShow(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.storyAvatarContainer}>
        <StoryAvatar {...{ openStories, index, item: stories[index] }} />
      </View>
      <Modal
        visible={isStoryViewVisible}
        statusBarTranslucent={true}
        onRequestClose={closeStory}>
        <SafeAreaView style={styles.storyContainer}>
          <StoryContainer
            visible
            stories={stories[index].stories}
            maxVideoDuration={10}
            renderHeaderComponent={() => (
              <Header userStories={stories[index]} onClosePress={closeStory} />
            )}
            renderFooterComponent={() => <Footer />}
            //Callback when status view completes
            onComplete={closeStory}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default StoryScreen;
