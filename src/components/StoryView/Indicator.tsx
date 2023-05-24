import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { Colors } from '../../theme';
import styles from './styles';

const Indicator = (props: ActivityIndicatorProps) => (
  <ActivityIndicator
    style={styles.loaderStyle}
    pointerEvents="none"
    color={Colors.loaderColor}
    size={'large'}
    {...props}
  />
);

export default Indicator;
