import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import type { StoryViewProps } from './types';

const StoryView = ({ label = 'Story View' }: StoryViewProps) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
    </View>
  );
};

export default StoryView;
