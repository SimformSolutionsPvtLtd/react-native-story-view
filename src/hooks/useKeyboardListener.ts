import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Metrics } from '../theme';

const useKeyboardListener = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Metrics.isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Metrics.isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboardListener;
