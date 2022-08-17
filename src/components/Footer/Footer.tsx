import React, { useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../../assets';
import { Strings } from '../../constants';
import { useKeyboardListener } from '../../hooks';
import { Colors } from '../../theme';
import styles from './styles';
import type { FooterProps } from './types';

const Footer = ({
  onIconPress,
  onSendTextPress,
  sendTextStyle,
  sendIconStyle,
  inputStyle,
  containerStyle,
  sendText,
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

  const _sendTextStyle = StyleSheet.flatten([styles.sendText, sendTextStyle]);
  const _sendIconStyle = StyleSheet.flatten([styles.sendIcon, sendIconStyle]);
  const _inputStyle = StyleSheet.flatten([styles.input, inputStyle]);
  const _containerStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);

  return (
    <View style={_containerStyle} {...containerViewProps}>
      <View style={styles.sectionStyle}>
        <>
          {customInput ?? (
            <TextInput
              ref={ref}
              style={_inputStyle}
              placeholder={Strings.sendMessage}
              placeholderTextColor={Colors.white}
              {...rest}
            />
          )}
        </>
        {isKeyboardVisible && shouldShowTextInputSend && (
          <TouchableOpacity onPress={handleSendTextPress}>
            <Text style={_sendTextStyle} {...sendTextProps}>
              {sendText ?? Strings.send}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!isKeyboardVisible && shouldShowSendImage && (
        <TouchableOpacity onPress={onIconPress} testID="footerIcon">
          <Image
            source={Icons.send}
            style={_sendIconStyle}
            {...sendIconProps}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
