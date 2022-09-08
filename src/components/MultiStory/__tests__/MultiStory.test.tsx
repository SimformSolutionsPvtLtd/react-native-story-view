import React from 'react';
import { render } from '@testing-library/react-native';
import MultiStory from '../MultiStory';

jest.useFakeTimers();

describe('MultiStory Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<MultiStory stories={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
