import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import Video, { OnBufferData, OnLoadData } from 'react-native-video';
import { Colors, Metrics } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StoryViewProps, StroyTypes } from './types';

const BUFFER_TIME = 1000 * 60;

const StoryView = (props: StoryViewProps) => {
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const source = props?.stories?.[props?.progressIndex];
  const videoRef = useRef<Video>(null);
  const videoData = useRef<OnLoadData>();
  const isCurrentIndex = props?.index === props?.storyIndex;

  useEffect(() => {
    if (props?.index === props?.storyIndex) {
      videoRef?.current?.seek(0);
    }
  }, [props?.storyIndex, props?.index]);

  const onLoadStart = () => {
    setLoading(true);
  };

  const loadVideo = () => {
    if (isCurrentIndex) {
      if (videoData.current === undefined) return;
      setLoading(false);
      setBuffering(false);
      props?.onVideoLoaded?.(videoData.current);
    }
  };

  const onBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
  };

  const { height, width } = useWindowDimensions();

  return (
    <View style={[styles.divStory, { height, width }]} ref={props?.viewRef}>
      {source?.type === StroyTypes.Image ? (
        <ProgressiveImage
          viewStyle={props?.imageStyle ?? styles.imgStyle}
          imgSource={{ uri: source.url ?? '' }}
          thumbnailSource={{ uri: source.url ?? '' }}
          onImageLoaded={props.onImageLoaded}
        />
      ) : (
        isCurrentIndex && (
          <>
            <Video
              ref={videoRef}
              resizeMode="contain"
              paused={props.pause || loading}
              source={{
                uri: source?.url,
              }}
              onEnd={props?.onVideoEnd}
              onError={(_error: any) => {
                setLoading(false);
              }}
              onProgress={data => {
                if (isCurrentIndex) {
                  props?.onVideoProgress?.(data);
                }
              }}
              bufferConfig={{
                minBufferMs: BUFFER_TIME,
                bufferForPlaybackMs: BUFFER_TIME,
                bufferForPlaybackAfterRebufferMs: BUFFER_TIME,
              }}
              onBuffer={onBuffer}
              onLoadStart={onLoadStart}
              onLoad={(item: OnLoadData) => {
                videoData.current = item;
                !Metrics.isIOS && loadVideo();
              }}
              onReadyForDisplay={loadVideo}
              style={styles.contentVideoView}
              {...props?.videoProps}
            />
            {(loading || buffering) && props?.showSourceIndicator && (
              <ActivityIndicator
                animating
                pointerEvents="none"
                color={Colors.loaderColor}
                size="small"
                style={styles.loaderView}
                {...props?.sourceIndicatorProps}
              />
            )}
          </>
        )
      )}
    </View>
  );
};

export default StoryView;
