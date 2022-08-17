import type React from 'react';
import type {
  ImageProps,
  TextInput,
  TextInputProps,
  TextProps,
  ViewProps,
} from 'react-native';

export type FooterComponentProps = React.ReactElement<FooterProps>;

export type FooterProps = TextInputProps & {
  label?: string;
  sendIconProps?: ImageProps;
  sendTextProps?: TextProps;
  containerViewProps?: ViewProps;
  shouldShowTextInputSend?: boolean;
  customInput?: TextInput | null;
  shouldShowSendImage?: boolean;
  onIconPress?: () => void | null;
  onSendTextPress?: () => void | null;
};
