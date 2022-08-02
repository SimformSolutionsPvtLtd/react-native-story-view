import React from 'react';
import { LogBox, View } from 'react-native';
import Routes from './navigation/Routes';
import { styles } from './theme';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."
]);

const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
};

export default App;
