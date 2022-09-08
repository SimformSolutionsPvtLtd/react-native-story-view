import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import styles from './styles';
import type { UserProps } from './types';

export default memo(function ProfileHeader({
  userImage,
  userName,
  userMessage,
  userImageStyle,
  rootStyle,
  userNameStyle,
  userMessageStyle,
  closeIconStyle,
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
  const _rootStyle = StyleSheet.flatten([styles.userView, rootStyle]);
  const _userNameStyle = StyleSheet.flatten([styles.name, userNameStyle]);
  const _userMessageStyle = StyleSheet.flatten([
    styles.message,
    userMessageStyle,
  ]);
  const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
  const _closeIconStyle = StyleSheet.flatten([
    styles.closeIcon,
    closeIconStyle,
  ]);

  const touchPos = {
    top: 20,
    bottom: 30,
    left: 30,
    right: 30,
  };

  return (
    <View style={_rootStyle} {...rest}>
      {!!userImage && (
        <TouchableOpacity onPress={() => onImageClick?.()}>
          <Image
            source={userImage}
            style={_userImageStyle}
            {...userImageProps}
          />
        </TouchableOpacity>
      )}
      <View style={_containerStyle}>
        <View style={styles.barUsername}>
          <Text style={_userNameStyle} {...userNameProps}>
            {userName}
          </Text>
        </View>
        {!!userMessage && (
          <Text style={_userMessageStyle} {...userMessageProps}>
            {userMessage}
          </Text>
        )}
      </View>
      {customCloseButton ?? (
        <TouchableOpacity onPress={() => onClosePress?.()} hitSlop={touchPos}>
          <Image
            source={Icons.closeIcon}
            style={_closeIconStyle}
            {...closeIconProps}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
