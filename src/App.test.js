import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Link from './components/Link'






describe('<App />', () => {
    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('should render one <Link /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Link).length).toBe(1);
  });

  it('should render a single <button /> element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('button').length).toEqual(1)
  })

  it('the state of pressed should have an initial state of false', () =>{
    const wrapper = shallow(<App />);
    expect(wrapper.state(['pressed'])).toEqual(false)
  })

  it('should display an h1 element with the text HELLO when button is clicked', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h1').text()).toEqual("HELLO");
  })
})

describe('<Link />', () => {
  it('should render a single anchor tag', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper.find('a').length).toEqual(1);
  })


  test('anchor tag should display text', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper.find('a').text().length).toBeGreaterThan(0);
  })
})


