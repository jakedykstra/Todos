// this code is used to test app.js 
import React from 'react';
// import shallow for handling component rendering with non of the children components. 
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

// let wrapped needs to be initialized here because, although beforeEach will send it to both it statements, they will come back undefined. This makes it accessable to them. Make sure to use let because we will want to reassign this component
let wrapped;

// places this as the start of the test for each test
// any logic in here is executed before the other tests
// before each only applys to tests within this file
beforeEach(() => {
  wrapped = shallow(<App />);
});

// within it we have a string description of what we are testing for and then a function containing our test logic
// also assume the it blends into the name. We dont need to then write in the string description it shows or test shows
// try your best to write tests that don't assume to know the inner workings of another component that we're testing. It's better to assume we don't have that knowledge. Ex: We really don't want to test for a string to be within the dom of that unless we have to. These are secret workings, so it's better off just to see if the component exists. 

it('shows a comment box', () => {
  // were using wrapped here to indicate the object we get back from this is a wrapped component. Means it's a component with some additional functionality loaded on top. Component is more clear but all enzyme doucmentation calls it wrapped
  // find returns an array of every instance that it was found. since it's an array we can use .length. now we can write out our expectation which is toEqual(1)
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
