import type React from 'react';
import type {
  ImageProps,
  TextInputProps,
  TextProps,
  ViewProps,
} from 'react-native';

export type FooterComponentProps = React.ReactElement<FooterProps>;

export type FooterProps = TextInputProps & {
  label?: string;
  iconProps?: ImageProps;
  textProps?: TextProps;
  viewProps?: ViewProps;
  shouldShowTextInputSend?: boolean;
  shouldShowSendImage?: boolean;
  onIconPress?: () => void | null;
  onSendTextPress?: () => void | null;
};
