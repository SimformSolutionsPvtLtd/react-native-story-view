import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import styles from './styles';
import type { UserProps } from './types';

export default memo(function UserHeaderView(props: UserProps) {
  return (
    <View style={styles.userView}>
      {props?.userImage && (
        <TouchableOpacity
          onPress={() => props?.onImageClick && props?.onImageClick()}>
          <Image source={props?.userImage} style={styles.image} />
        </TouchableOpacity>
      )}
      <View style={styles.userContainer}>
        <View style={styles.barUsername}>
          <Text style={styles.name}>{props?.userName}</Text>
          <Image source={Icons.verifyIcon} style={styles.verifyIcon} />
        </View>
        {!!props?.userMessage && (
          <Text style={styles.time}>{props?.userMessage}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => props?.onClosePress && props?.onClosePress()}>
        <Image source={Icons.closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
});
