import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Footer from '../Footer';

jest.useFakeTimers();

describe('Footer Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<Footer />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Footer TextInput', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<Footer placeholder="Send Message" />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Footer Icon Props', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<Footer shouldShowSendImage={false} />);
    expect(toJSON()).toMatchSnapshot();
  });
  test('onIconPress event', () => {
    const onPressEvent = jest.fn();
    const { getByTestId } = render(<Footer onIconPress={onPressEvent} />);

    const sendIconButton = getByTestId('footerIcon');
    fireEvent.press(sendIconButton);
    expect(onPressEvent).toHaveBeenCalled();
  });
  test('hide send icon', () => {
    const { queryByTestId } = render(<Footer shouldShowSendImage={false} />);
    const sendIconButton = queryByTestId('footerIcon');
    expect(sendIconButton).toBe(null);
  });
});
