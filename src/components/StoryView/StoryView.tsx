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
    setLoading(true);
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
          {loading && props?.showSourceIndicator && (
            <ActivityIndicator
              animating
              color={Colors.loaderColor}
              size="small"
              style={styles.loaderView}
              {...props?.sourceIndicatorProps}
            />
          )}
          <Video
            resizeMode="contain"
            paused={props.pause}
            source={{ uri: image?.url }}
            onError={(_error: any) => {
              setLoading(false);
            }}
            onLoadStart={onLoadStart}
            onLoad={(item: OnLoadData) => {
              setLoading(false);
              props.onVideoLoaded && props.onVideoLoaded(item);
            }}
            style={styles.contentVideoView}
            {...props?.videoProps}
          />
        </>
      )}
    </View>
  );
};

export default StoryView;
