import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../assets';
import { Strings } from '../../constants';
import { useKeyboardListener } from '../../hooks';
import { Colors } from '../../theme';
import styles from './styles';
import type { FooterProps } from './types';

const Footer = ({
  onIconPress,
  onSendTextPress,
  shouldShowSendImage = true,
  shouldShowTextInputSend = true,
  iconProps,
  textProps,
  viewProps,
  ...rest
}: FooterProps) => {
  const isKeyboardVisible = useKeyboardListener();

  return (
    <View style={styles.container} {...viewProps}>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.input}
          placeholder={Strings.sendMessage}
          placeholderTextColor={Colors.white}
          {...rest}
        />
        {isKeyboardVisible && shouldShowTextInputSend && (
          <TouchableOpacity onPress={onSendTextPress}>
            <Text style={styles.sendText} {...textProps}>
              {Strings.send}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!isKeyboardVisible && shouldShowSendImage && (
        <TouchableOpacity onPress={onIconPress} testID="footerIcon">
          <Image source={Icons.send} style={styles.sendIcon} {...iconProps} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
