import React from 'react';
import { render } from '@testing-library/react-native';
import MultiStoryContainer from '../MultiStoryContainer';

jest.useFakeTimers();

describe('MultiStoryContainer Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(
      <MultiStoryContainer visible={false} stories={[]} viewedStories={[]} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
