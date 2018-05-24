# React Unit Testing with Jest and Enzyme 101 

This will be a brief tutorial for using Jest and Enzyme to unit test React components. Unit testing can seem daunting to those new to it, but it's actually not as complicated as it may seem. Running successful tests can help drive development goals and designs that can further bring the potential out of your app and your team.

## Getting Started

Let's get started.

First, let's make a directory to place all of our files. In your terminal, do the following:
  ```
    mkdir <directory_name>
    cd <directory_name>
  ```

Next let's create a react app using `create-react-app`.

If you don't have `create-react-app` installed, please do the following in your terminal:
  ```
    npm install -g create-react-app
  ```
Once inside of your newly created directory, using your terminal type the following:
  ```
    create-react-app <appname>
  ```
Keep in mind that the name of the app ***MUST*** be *lowercase*.

For all intents and purposes of this tutorial I will be using the name `jest_tutorial`.

  ```
    create-react-app jest_tutorial
  ```

Once your app is created, `cd` into your fresh React app.

  ```
    cd jest_tutorial
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
  ```
  import enzyme from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  enzyme.configure({ adapter: new Adapter() });
  ```

Your application should now be configured to use `Jest` and `Enzyme` for unit testing.  

## Running Your First Test

When using `Jest`, test files are specified with the following naming convention:  `Filename.test.js`. Essentially it's the same as the original filename but with `.test.` added in the middle. 

An example would be the intial test file generated with `create-react-app`. You will find that it is named `App.test.js`. This is a test file specifically created to test anything inside of the file `App.js`.

To run our tests, do the following in your terminal:
  ```
    npm run test
  ```

  After a few seconds, the following should appear in your terminal:
  ![alt text](https://github.com/ddmilo/jest_enzyme_tutorial/blob/master/public/images/test_success_1.PNG "Successful Test")

  Congratulations, you've ran your first successful test!


## Built With

* [Create-react-app](https://github.com/facebook/create-react-app)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](https://github.com/airbnb/enzyme)

## Authors

* **Dan Milo**  - [ddmilo](https://github.com/ddmilo)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

