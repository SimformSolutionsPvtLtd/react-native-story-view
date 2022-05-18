import React from 'react';
import { render } from '@testing-library/react-native';
import StoryView from '../StoryView';

jest.useFakeTimers();

describe('CounterButton component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<StoryView />);
    expect(toJSON()).toMatchSnapshot();
  });
});
