import React, { useRef, useState } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import {
  type MultiStoryRef,
  Indicator,
  MultiStory,
  TransitionMode
} from 'react-native-story-view';
import { stories, Strings } from '../../constants';
import { Header, Footer } from '../../components';
import { Colors } from '../../theme';
import Images from '../../assets';
import styles from './styles';

const MultiStoryScreen = () => {
  const multiStoryRef = useRef<MultiStoryRef>(null);
  const [userStories, setUserStories] = useState(
    JSON.parse(JSON.stringify(stories))
  );

  const onStoryClose = (viewedStories?: Array<boolean[]>) => {
    if (viewedStories == null || viewedStories == undefined) return;
    const stories = [...userStories];
    userStories.map((_: any, index: number) => {
      userStories[index].stories.map((_: any, subIndex: number) => {
        stories[index].stories[subIndex].isSeen =
          viewedStories[index][subIndex];
      });
    });
    setUserStories([...stories]);
  };

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={Images.background}>
      <View style={styles.storyWrapper}>
        <Text style={styles.albumText}>{Strings.album}</Text>
        <MultiStory
          stories={userStories}
          transitionMode={TransitionMode.Cube}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ref={multiStoryRef}
          /* callback after multi story is closed
            `viewedStories` contains multi dimension array of booleans whether story is seen or not
          */
          onComplete={onStoryClose}
          avatarProps={{
            viewedStoryContainerStyle: {
              borderColor: Colors.lightGrey
            }
          }}
          storyContainerProps={{
            renderHeaderComponent: ({ userStories }) => (
              <Header {...{ userStories, multiStoryRef }} />
            ),
            renderFooterComponent: ({ userStories, story, progressIndex }) => (
              <Footer {...{ userStories, story, progressIndex }} />
            ),
            renderIndicatorComponent: () => <Indicator />,
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
