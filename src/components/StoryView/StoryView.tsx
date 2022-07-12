import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';
import { Colors } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StoryViewProps, StroyTypes } from './types';

const StoryView = (props: StoryViewProps) => {
  const [loading, setLoading] = useState(true);
  const image = props?.stories?.[props?.progressIndex];

  const onLoadStart = () => {
    setLoading(false);
  };

  return (
    <View style={styles.divStory} ref={props?.viewRef}>
      {image?.type === StroyTypes.Image ? (
        <ProgressiveImage
          viewStyle={props?.imageStyle ?? styles.imgStyle}
          imgSource={{ uri: image.url ?? '' }}
          thumbnailSource={{ uri: image.url ?? '' }}
          onImageLoaded={props.onImageLoaded}
        />
      ) : (
        <>
          {loading && (
            <ActivityIndicator
              animating
              color={Colors.loaderColor}
              size="large"
              style={styles.loaderView}
            />
          )}
          <Video
            resizeMode="contain"
            paused={props.pause}
            source={{ uri: image?.url }}
            onError={(_error: any) => {
              setLoading(true);
            }}
            onLoadStart={onLoadStart}
            onLoad={(item: OnLoadData) => {
              props.onVideoLoaded && props.onVideoLoaded(item);
            }}
            style={[styles.contentVideoView]}
          />
        </>
      )}
    </View>
  );
};

export default StoryView;
