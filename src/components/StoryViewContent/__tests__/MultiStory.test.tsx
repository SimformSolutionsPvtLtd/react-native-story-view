import React from 'react';
import { render } from '@testing-library/react-native';
import StoryView from '../StoryView';

jest.useFakeTimers();

describe('StoryView Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<StoryView stories={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
