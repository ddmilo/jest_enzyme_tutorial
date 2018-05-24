# React Unit Testing with Jest and Enzyme 101 

This will be a brief tutorial for using `Jest` and `Enzyme` to unit test `React` components. Unit testing can seem daunting to those new to it, but it's actually not as complicated as it may seem. Running successful tests can help drive development goals and designs that can further bring the potential out of your app and your team.


`Jest` is used by Facebook to test all JavaScript code including React applications. One of Jest's philosophies is to provide an integrated "zero-configuration" experience. We observed that when engineers are provided with ready-to-use tools, they end up writing more tests, which in turn results in more stable and healthy code bases.

`Enzyme` is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output. Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.
## Getting Started

Let's get started.

First, let's make a directory to place all of our files. In your terminal, do the following:
  ```bash
    mkdir <directory_name>
    cd <directory_name>
  ```

Next let's create a react app using `create-react-app`.

If you don't have `create-react-app` installed, please do the following in your terminal:
  ```bash
    npm install -g create-react-app
  ```
Once inside of your newly created directory, using your terminal type the following:
  ```bash
    create-react-app <appname>
  ```
Keep in mind that the name of the app ***MUST*** be *lowercase*.

For all intents and purposes of this tutorial I will be using the name `jest_enzyme_tutorial`.

  ```bash
    create-react-app jest_enzyme_tutorial
  ```

Once your app is created, `cd` into your fresh React app.

  ```bash
    cd jest_enzyme_tutorial
  ```
### Installing Jest and Enzyme

Now we're going to install `Jest` and `Enzyme` along with any other dependencies we will need.

If you created your app using `create-react-app`, then `Jest` has already been installed into your application and is fully functional out of the box. ***Skip the step below.***

For those that created their React app without using `create-react-app`, install the following dependencies along with `Jest`:
  ```
    npm install --save-dev jest babel-jest babel-preset-env babel-preset-react react-test-renderer
  ```
Let's install `Enzyme` along with the dependencies that we will need:
  ```
    npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
  ```

That does it for installation, now let's configure `Enzyme` to work with `Jest`.

In the `src` folder of your project, create a file named `setupTests.js`. Paste the following code inside:
  ```javascript
  import enzyme from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  enzyme.configure({ adapter: new Adapter() });
  ```

Your application should now be configured to use `Jest` and `Enzyme` for unit testing.  

## Running Your First Test

When using `Jest`, test files are specified with the following naming convention:  `Filename.test.js`. Essentially it's the same as the original filename but with `.test.` added in the middle. 

An example would be the intial test file generated with `create-react-app`. You will find that it is named `App.test.js`. This is a test file specifically created to test anything inside of the file `App.js`.

To run our tests, do the following in your terminal:
  ```bash
    npm run test
  ```

  After a few seconds, the following should appear in your terminal:

  ![alt text](https://github.com/ddmilo/jest_enzyme_tutorial/blob/master/public/images/test_success_1.PNG "Successful Test")

  Congratulations, you've ran your first successful test!

## Writing Our First Test
So, we know how to run our tests, now let's get to writing them. First let's have a look at `App.test.js`. The file should look like this at the moment:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

```
It's a simple test written to see if the `<App />` component will render without crashing. This test will also test the `render` speed of the component.

Now let's have a look at the file that `App.test.js` is testing:

```javascript
  import React, { Component } from 'react';
  import logo from './logo.svg';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      );
    }
  }

  export default App;

```
This is your typical `App.js` generated by `create-react-app`. Now let's get rid of everything except for the highest level `<div>`. Your `App.js` should now look like this:

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;

```

Now let's create a `<button>` that toggles a `state` called `buttonState` with an initial value of `false`. When clicked the `state` will have a value of `true`, and display an `h1` with the text `"HELLO"`.

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    buttonState: false
  }

  buttonClick = () => {
    this.setState({
      buttonState: true
    })
  }
  render() {
    const buttonState = this.state.buttonState
    return (
      <div className="App">

        {buttonState ?
          (<h1>HELLO</h1>) : (null) 
        }
        
        <button onClick={this.buttonClick}>Click Me </button>
      </div>
    );
  }
}

export default App;

```

Your browser should now display the `<button>` we made, and when clicked, the text display of `"HELLO"`.

![alt text](./public/images/browser_hello.png "browser_hello")

Visually this may not seem like much, but it's more than enough to start writing our first test. You have to be able to break apart components and functionality to the smallest detail and to look at them from different perspectives. That knowledge will help you write great unit tests.

So how can we break this down? Let's think.

  * The user has to be able to see the rendered `<button>`.
  * When clicked, the user should be able to see `"HELLO"` displayed on the screen.
  * The initial state of `buttonState` should always be `false`.

Those three things should be good enough to start with. Now let's get to writing those tests! First let's `import` Enzyme's `shallow rendering` at the top level of our test file.

```javascript
// App.test.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
```
`Shallow rendering` is useful to constrain yourself to testing a component as a unit, and to ensure that your tests aren't indirectly asserting on behavior of child components.

Now let's write our first test inside of `App.test.js`.
```javascript
it('should render a single <button /> element', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('button').length).toEqual(1)
})
```

Let's breakdown the code above. 

```javascript
    // `it` is an alias of `test`. You may use either term to write your tests
    // The first line in the test is your component, shallow rendered using Enzyme
    // The last line is what conditions you expect your test to use.
    // This one specifically expects to 'find' one button element in the component
  it('description of test case', () => {
    const thisIsYourComponentVariable = shallow(<ComponentName />);
    expect(thisIsYourComponentVariable.find('button').length).toEqual(1));
  })
```


Your `App.test.js` should now look like this.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render a single <button /> element', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('button').length).toEqual(1)
})
```

Let's run our tests again with `npm run test`. Our terminal should display the following:

![alt text](./public/images/test_success_2.png "test_success_2")

Congrats! You've writted your first test, but how do we know that it's actually testing correctly and not giving a false positive. Easy. In your `App.js` comment the line that contains the button element.

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    buttonState: false
  }

  buttonClick = () => {
    this.setState({
      buttonState: true
    })
  }
  render() {
    const buttonState = this.state.buttonState
    return (
      <div className="App">

        {buttonState ?
          (<h1>HELLO</h1>) : (null) 
        }
        
        {/* <button onClick={this.buttonClick}>Click Me </button> */}
      </div>
    );
  }
}

export default App;

```

Then run `npm run test`. It should then give you a failing test.

![alt text](./public/images/test_fail_1.png "test_fail_1")

When working on large projects the number of tests can add up, making it a bit confusing to find a specific test against a large list. This is where `describe` can come in handy.
`describe` creates a block that groups together several related tests in one "test suite". This is used to clean large lists of tests to easily distinguish between different testing suite.

```javascript
describe('<ComponentNameHere />', () => {
  // Unit Tests Here
})
```
When using `npm run test`, your terminal should look similar to this:

![alt text](./public/images/test_suites.png "test_suites")

See how my tests for my `<App />` component and my `<Link />` component are separated neatly? That's the power of a `describe` function.

## Wrap Up

That should do it for this tutorial. This is barely scratching the surface of using `Jest` and `Enzyme` but it should be enough to get you through writing your own tests. Now I would like you to finish writing the remaining tests that we thought of earlier with help from the tutorials and the [`Jest`](https://facebook.github.io/jest/) and [`Enzyme`](https://github.com/airbnb/enzyme) docs, then I would like you to challenge yourself by creating and testing your own components.

I hope you learned a thing or two. Until next time.

      - Dan


## Built With

* [Create-react-app](https://github.com/facebook/create-react-app)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](https://github.com/airbnb/enzyme)

## Authors

* **Dan Milo**  - [ddmilo](https://github.com/ddmilo)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

