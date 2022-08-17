import React, { useRef } from 'react';
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
  sendIconProps,
  sendTextProps,
  containerViewProps,
  customInput,
  ...rest
}: FooterProps) => {
  const isKeyboardVisible = useKeyboardListener();
  const ref = useRef<TextInput>(null);

  const handleSendTextPress = () => {
    ref?.current?.clear();
    onSendTextPress?.();
  };

  return (
    <View style={styles.container} {...containerViewProps}>
      <View style={styles.sectionStyle}>
        <>
          {customInput ?? (
            <TextInput
              ref={ref}
              style={styles.input}
              placeholder={Strings.sendMessage}
              placeholderTextColor={Colors.white}
              {...rest}
            />
          )}
        </>
        {isKeyboardVisible && shouldShowTextInputSend && (
          <TouchableOpacity onPress={handleSendTextPress}>
            <Text style={styles.sendText} {...sendTextProps}>
              {Strings.send}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!isKeyboardVisible && shouldShowSendImage && (
        <TouchableOpacity onPress={onIconPress} testID="footerIcon">
          <Image
            source={Icons.send}
            style={styles.sendIcon}
            {...sendIconProps}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
