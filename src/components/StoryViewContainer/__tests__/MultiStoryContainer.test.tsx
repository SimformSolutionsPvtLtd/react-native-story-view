import React from 'react';
import { render } from '@testing-library/react-native';
import StoryViewContainer from '../StoryViewContainer';

jest.useFakeTimers();

describe('StoryViewContainer Component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(
      <StoryViewContainer visible={false} stories={[]} viewedStories={[]} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
