import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Footer, StoryContainer, UserHeaderView } from 'react-native-story-view';
import { stories } from './constants';
import { Colors } from './theme';
import { getDateWithNow } from './utils/commonHelper';

const App = () => {
  const [isStoryViewShow, setIsStoryViewShow] = useState<boolean>(false);

  const openStories = () => {
    setIsStoryViewShow(true);
  }

  const renderFooter = () => {
    return (
      <Footer
        onIconPress={() => {
          Alert.alert('Icon pressed');
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
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
          footerComponent={renderFooter()}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    flex:1
  },
  storyText: {
    color: Colors.red
    }
});

export default App;
