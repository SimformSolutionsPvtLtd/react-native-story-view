import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardListener = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<Boolean>(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
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
