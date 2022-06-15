import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StoryContainer, UserHeaderView } from 'react-native-story-view';
import { stories } from './constants';
import { getDateWithNow } from './utils/commonHelper';

const App = () => {
  const [isStoryViewShow, setIsStoryViewShow] = useState<boolean>(false);

  const openStories = () => {
    setIsStoryViewShow(true);
  }

  return (
    <>
      {!isStoryViewShow && <View style={styles.mainContainer}>
        <Pressable onPress={openStories}>
          <Text style={styles.storyText}>
            Open Stories
          </Text>
        </Pressable>
      </View>
      }
      {/* Individual Story View component */}
      {
        isStoryViewShow &&
        <StoryContainer
          visible={true}
          stories={stories[1].stories}
          maxVideoDuration={25}
          headerComponent={
            <UserHeaderView
              userImage={{ uri: stories[1].profile ?? '' }}
              userName={stories[1].username}
              userMessage={getDateWithNow(stories?.[1]?.title)}
              onImageClick={() => {
                Alert.alert('User profile image tapped');
              }}
              onClosePress={() => {
                setIsStoryViewShow(false);
              }}
            />
          }
          //Callback when status view completes
          onComplete={() => setIsStoryViewShow(false)}
        />
      }
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  storyText: {
    color: 'white'
  }
});

export default App;
