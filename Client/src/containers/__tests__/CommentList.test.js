import React from 'react';
import { mount } from 'enzyme';

import CommentList from 'components/CommentList';
// allows us to pull the root state for testing
import Root from 'Root';

let wrapped;

beforeEach(() => {
  // creating an initial state to use as a prop for our component tests. To do this we pass this prop to the root
  const initialState = {
    comments: ['Comment 1', 'Comment 2']
  };

  wrapped = mount(
    // here we pass the before each initialState to the root to be used for comments
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it('creates one LI per comment', () => {
  expect(wrapped.find('li').length).toEqual(2);
});

it('shows the text for each comment', () => {
  // render will give us back a cherio element, which using cherio docs, we use .text to evaluate for the visible text within
  expect(wrapped.render().text()).toContain('Comment 1');
  expect(wrapped.render().text()).toContain('Comment 2');
});
