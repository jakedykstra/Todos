import commentsReducer from 'reducers/comments';
import { SAVE_COMMENT } from 'actions/types';

it('handles actions of type SAVE_COMMENT', () => {
  // we make a fake action here
  const action = {
    type: SAVE_COMMENT,
    payload: 'New Comment'
  };
  // call the commentsReducer with an empty state then the action we just fabricated
  const newState = commentsReducer([], action);

  // expect the fake state to contain 'New Comment'
  expect(newState).toEqual(['New Comment']);
});

it('handles action with unknown type', () => {
  const newState = commentsReducer([], { type: 'LKAFDSJLKAFD' });

  expect(newState).toEqual([]);
});
