import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View, LogBox, Image} from 'react-native';
import { Footer, StoryContainer, UserHeaderView } from 'react-native-story-view';
import { stories } from './constants';
import { Colors } from './theme';
import { getDateWithNow } from './utils/commonHelper';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
])

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
          <View style={styles.imageContainer}>
            <Image 
            style={styles.image}
            source={{uri:stories[1].profile}}/>
          </View>
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
  container: {
    flex: 1
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 25
  },
  imageContainer: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.red
  }
});

export default App;
