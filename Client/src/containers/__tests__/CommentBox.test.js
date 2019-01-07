import React from 'react';
// here we will use full DOM rendering. We could use Shallow since we don't need the children components to render for testing but this is an example for how to do full DOM. NOTE: full DOM is called mount 
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

// for each test we will start the component then unmount(clean up) the component so we can start a new one. beforeEach/afterEach
beforeEach(() => {
  wrapped = mount(
    // comment box will be tricked by recieving the redux store from root, which stores provider
    // comment box will be sent to root.js as props.children, where we can render it
    // just make use of this to test. Any component wrapped in it will think its part of the redux store. Root will render any children it's provided
    <Root>
      <CommentBox />
    </Root>
  );
});

// unmount is done for clean up after running a test
afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two buttons', () => {
  // .find can search for elements within DOM as well
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});
// describe function is used here so that we can set a beforeEach for the tests below without impacting the tests above. All tests will still get the beforeEach at the top. Describe groups together tests with common sets, like the text area here
describe('the text area', () => {
  beforeEach(() => {
    // we simulate a change event for the text area which will call the onChange and then the function handleState
    // to do this we provide a fake event object, 
    // .simulate is used for events. When using simulate you want to use the name of the actual html event, which in this case would be 'change'. You want to do this rather than the react naming which is always the name of the html event with 'on' in front. ex: onChange
    wrapped.find('textarea').simulate('change', {
      // if you look at eventhandler handleChange in CommentBox.js, it gets called with the event argument, which then is referenced to event.target.value. We use that to set a new state (setState) to 'comment:' in our state. If we want to trick the comment box to use a value here, we have to modify the value of event.target.value. Do this using a mock event object as seen here, where within target is the value 'new comment'
      target: { value: 'new comment' }
    });
    // here we force the component to update since it will not do so automatically 
    // .update forces a component to re-render itself
    wrapped.update();
  });

  // we have to first find the textarea
  it('has a text area that users can type in', () => {
    //prop() allows us to pull the prop that is passed to any element, meaning we can find the textarea and ask it to retrieve the value prop assigned to it
    // we find the area, check that the prop value equals 'new comment'
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, text area gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    // verifying that the textarea is completely empty
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
