import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, MultiStoryScreen, StoryScreen } from '../modules';
import { NavigationStrings } from '../constants';
import { Colors } from '../../src/theme';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.black
  },
  headerTintColor: Colors.white
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationStrings.HOME}>
        <Stack.Screen
          name={NavigationStrings.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationStrings.MULTI_STORY_SCREEN}
          component={MultiStoryScreen}
          {...{ options }}
        />
        <Stack.Screen
          name={NavigationStrings.STORY_SCREEN}
          component={StoryScreen}
          {...{ options }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
