import React from 'react';
import { render } from '@testing-library/react-native';
import StoryAvatar from '../StoryAvatar';

jest.useFakeTimers();

describe('StoryAvatar Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<StoryAvatar index={0} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
