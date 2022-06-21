import React from 'react';
import { Animated, View } from 'react-native';
import styles from './styles';
import type { ProgressiveImageProps } from './types';

const ProgressiveImage = (props: ProgressiveImageProps) => {
  const thumbnailAnimated = new Animated.Value(0.2);
  const { thumbnailSource, imgSource, viewStyle, ...reset } = props;

  const imageAnimated = new Animated.Value(0);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.progressiveImageContainer}>
      <Animated.Image
        {...reset}
        source={thumbnailSource}
        style={[viewStyle, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={2}
      />
      <Animated.Image
        {...reset}
        source={imgSource}
        style={[styles.imageOverlay, { opacity: imageAnimated }, viewStyle]}
        onLoad={onImageLoad}
        onLoadEnd={() => props.onImageLoaded && props.onImageLoaded()}
      />
    </View>
  );
};

export default ProgressiveImage;
