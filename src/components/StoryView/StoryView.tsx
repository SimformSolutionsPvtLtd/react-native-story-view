import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';
import { Colors, Metrics } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StoryViewProps, StroyTypes } from './types';

const StoryView = (props: StoryViewProps) => {
  const [loading, setLoading] = useState(true);
  const image = props?.stories?.[props?.progressIndex];
  const videoRef = useRef<Video>(null);
  const videoData = useRef<OnLoadData>();

  useEffect(() => {
    if (props?.index === props?.storyIndex) {
      videoRef?.current?.seek(0);
    }
  }, [props?.storyIndex, props?.index]);

  const onLoadStart = () => {
    setLoading(true);
  };

  const loadVideo = () => {
    if (videoData.current === undefined) return;
    setTimeout(() => {
      if (props?.index === props?.storyIndex) {
        props?.onVideoLoaded && props?.onVideoLoaded(videoData.current!);
        setLoading(false);
      }
    }, 250);
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
            ref={videoRef}
            resizeMode="contain"
            paused={props.pause || loading}
            source={{ uri: image?.url }}
            onError={(_error: any) => {
              setLoading(false);
            }}
            onLoadStart={onLoadStart}
            onLoad={(item: OnLoadData) => {
              videoData.current = item;
              !Metrics.isIOS && loadVideo();
            }}
            onReadyForDisplay={loadVideo}
            style={styles.contentVideoView}
            {...props?.videoProps}
          />
        </>
      )}
    </View>
  );
};

export default StoryView;
