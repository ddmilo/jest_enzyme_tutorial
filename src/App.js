import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Link from './components/Link';

class App extends Component {
  state = {
    pressed: false
  }

  buttonClick = () => {
    this.setState({
      pressed: true
    })
  }
  render() {
    const buttonState = this.state.pressed
    return (
      <div className="App">

        {buttonState ?
          (<h1>HELLO</h1>) : (null) 
        }
        
        <button onClick={this.buttonClick}>Press Me </button>

        <Link />
      </div>
    );
  }
}

export default App;
