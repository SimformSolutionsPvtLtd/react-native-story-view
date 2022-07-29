import React from 'react';
import { StyleSheet, LogBox, SafeAreaView } from 'react-native';
import { MultiStory } from 'react-native-story-view';
import { stories } from './constants';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."
]);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MultiStory stories={stories} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
