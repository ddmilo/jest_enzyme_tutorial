import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Link from './components/Link'


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// For unit testing we will be using Jest and Enzyme.
//Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
//Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.
// Jest is built in with create-react-app so no further configuration is needed as far as Jest goes
// The first step in configuring your Testing environment starts with simple npm installations
//    npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
// This will install the following dependencies
//    Enzyme
//    Enzyme Adapter
//    React Test Renderer

// setupTests.js stuff
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// describe(name, fn) creates a block that groups together several related tests in one "test suite". 
// This is used mainly to clean up code to easily differentiate separate test suites.
// This isn't required - you can just write the test blocks directly at the top level.
// But this can be handy if you prefer your tests to be organized into groups.
// In this walkthrough, I separated the tests written for the App component and the Link component into two different test suites.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

describe('<App />', () => {
  it('should render one <Link /> component', () => {
    const wrapper = shallow(<App />);
    // console.log('length', wrapper.find(Link).length)
    expect(wrapper.find(Link).length).toBe(1);
  });

  it('should render a single <button /> element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('button').length).toEqual(1)
  })

  it('the state of pressed should have an initial state of false', () =>{
    const wrapper = shallow(<App />);
    // console.log(wrapper.state(['pressed']))
    expect(wrapper.state(['pressed'])).toEqual(false)
  })

  it('should display an h1 element with the text HELLO when button is clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').simulate('click');
    console.log(wrapper.find('h1').text());
    expect(wrapper.find('h1').text()).toEqual("HELLO");
  })
})

// Testing the <Link /> component
describe('<Link />', () => {
  it('should render a single anchor tag', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper.find('a').length).toEqual(1);
  })


// "it" is an alias of "test". You may use either term to write tests
  test('anchor tag should display text', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper.find('a').text().length).toBeGreaterThan(0);
  })
})
