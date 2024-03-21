import * as React from 'react';
import { StoryViewContainer, StoryContainerProps, StoryRef } from '.';
import SingleStoryView from './SingleStoryView';

const Story = React.forwardRef<StoryRef, StoryContainerProps>(
  ({ extended = true, ...props }, ref) => {
    return extended ? (
      <SingleStoryView {...props} ref={ref} />
    ) : (
      <StoryViewContainer {...props} ref={ref} />
    );
  }
);

export default Story;
