import { saveComment } from 'actions';
import { SAVE_COMMENT } from 'actions/types';

// we just call the actions here and make sure they were running effectively
describe('saveComment', () => {
  it('has the correct type', () => {
    const action = saveComment();

    expect(action.type).toEqual(SAVE_COMMENT);
  });

  it('has the correct payload', () => {
    const action = saveComment('New Comment');

    expect(action.payload).toEqual('New Comment');
  });
});
