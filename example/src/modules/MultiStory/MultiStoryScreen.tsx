import React, { useRef } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { MultiStory } from '../../../../src';
import type { MultiStoryRef } from 'react-native-story-view';
import { stories, Strings } from '../../constants';
import { Colors } from '../../theme';
import styles from './styles';
import { Header, Footer } from '../../components';
import Images from '../../assets';

const MultiStoryScreen = () => {
  const multiStoryRef = useRef<MultiStoryRef>(null);
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={Images.background}>
      <View style={styles.storyWrapper}>
        <Text style={styles.albumText}>{Strings.album}</Text>
        <MultiStory
          stories={stories}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ref={multiStoryRef}
          storyContainerProps={{
            renderHeaderComponent: ({ userStories }) => (
              <Header {...{ userStories, multiStoryRef }} />
            ),
            renderFooterComponent: ({ userStories, story, progressIndex }) => (
              <Footer {...{ userStories, story, progressIndex }} />
            ),
            barStyle: {
              barActiveColor: Colors.red
            }
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default MultiStoryScreen;
