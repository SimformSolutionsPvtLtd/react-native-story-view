import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import styles from './styles';
import type { UserProps } from './types';

export default memo(function UserHeaderView({
  userImage,
  userName,
  userMessage,
  customCloseButton,
  onImageClick,
  onClosePress,
  containerStyle,
  userMessageProps,
  userNameProps,
  userImageProps,
  closeIconProps,
  ...rest
}: UserProps) {
  const _containerStyle = StyleSheet.flatten([
    styles.userContainer,
    containerStyle,
  ]);
  return (
    <View style={styles.userView} {...rest}>
      {!!userImage && (
        <TouchableOpacity onPress={() => onImageClick?.()}>
          <Image source={userImage} style={styles.image} {...userImageProps} />
        </TouchableOpacity>
      )}
      <View style={_containerStyle}>
        <View style={styles.barUsername}>
          <Text style={styles.name} {...userNameProps}>
            {userName}
          </Text>
        </View>
        {!!userMessage && (
          <Text style={styles.time} {...userMessageProps}>
            {userMessage}
          </Text>
        )}
      </View>
      {customCloseButton ?? (
        <TouchableOpacity onPress={() => onClosePress?.()}>
          <Image
            source={Icons.closeIcon}
            style={styles.closeIcon}
            {...closeIconProps}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
