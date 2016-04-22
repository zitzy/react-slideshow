/**
 * Created by Zitzy on 22.04.2016.
 */

import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
const springSettings = {stiffness: 170, damping: 26}; // spring params // you can play with them :) PS: dont forget to customize timer
const NEXT = 'show-next';

// Creating global timer variable
let timer = {};

const Slideshow = React.createClass({
  // Making initial state
  getInitialState() {
    return {
      photos: [[800, 450], [800, 450], [800, 450]], // array with dimensions of photos
      currPhoto: 0
    };
  },


  // buttons function
  clickHandler(btn){
    var photoIndex = btn === NEXT ? this.state.currPhoto+1 : this.state.currPhoto-1;

    // choose the right next photo
    photoIndex = photoIndex >= 0 ? photoIndex : this.state.photos.length - 1;
    photoIndex = photoIndex >= this.state.photos.length ? 0 : photoIndex;

    // clear timer so it will not be run multiple times
    clearTimeout(timer);

    // change state.currPhoto to the right one
    this.setState({
      currPhoto: photoIndex
    })
  },


  render() {
    const {photos, currPhoto} = this.state;
    const [currWidth, currHeight] = photos[currPhoto];

    const widths = photos.map(([origW, origH]) => currHeight / origH * origW);

    const leftStartCoords = widths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0);

    let configs = [];
    photos.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings),
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

    // start timer
    timer = setTimeout(() =>{
      this.clickHandler(NEXT);
    }, 5000);

    return (
      <div>
        <div>Press me please</div>
        <button onClick={this.clickHandler.bind(null, '')}>Previous</button>
        <button onClick={this.clickHandler.bind(null, NEXT)}>Next</button>
        <div className="demo4">
          <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
            {container =>
              <div className="demo4-inner" style={container}>
                {configs.map((style, i) =>
                    <Motion key={i} style={style}>
                      {style =>
                        <img className="demo4-photo" src={`./images/audi${i}.jpg`} style={style} />
                      }
                    </Motion>
                )}

              </div>
            }
          </Motion>
        </div>
      </div>
    );
  }


});

export default Slideshow;
