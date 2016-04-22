/**
 * Created by Zitzy on 05.04.2016.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slideshow from './slideshow.js';

class App extends Component {
  render() {
    return (
      <div>
        <Slideshow />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));



