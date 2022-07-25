import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Image, FlatList } from 'react-native';
import { MultiStoryContainer } from 'react-native-story-view';
import { stories } from './constants';
import { Colors } from './theme';

const MultiStoryContainerExample = () => {
  const [isStoryViewShow, setIsStoryViewShow] = useState<boolean>(false);
  const [pressedIndex, setPressedIndex] = useState<number>(0);

  const openStories = (index: number) => {
    setIsStoryViewShow(true);
    setPressedIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          horizontal
          data={stories}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => openStories(index)}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={{ uri: item.profile }} />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <MultiStoryContainer
        visible={isStoryViewShow}
        onComplete={() => {
          setIsStoryViewShow(false);
        }}
        storyIndex={pressedIndex}
        stories={stories}
      />
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

export default MultiStoryContainerExample;
