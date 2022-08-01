import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable } from 'react-native';
import { NavigationStrings, Strings } from '../../constants';
import styles from './styles';
import { NavProps } from './types';

const HomeScreen = () => {
  const navigation = useNavigation<NavProps>();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate(NavigationStrings.MULTI_STORY_SCREEN)
        }>
        <Text style={styles.text}>{Strings.MultiStory}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate(NavigationStrings.STORY_SCREEN)}>
        <Text style={styles.text}>{Strings.Story}</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
