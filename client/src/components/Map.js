import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

const Map = (props) => {
  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1800, 500).parent(canvasParentRef);
    p5.background(200);
  };

  const drawLine = (p5) => {
    if (p5.mouseIsPressed) {
      if (prevMouseX !== null && prevMouseY !== null) {
        p5.line(prevMouseX, prevMouseY, p5.mouseX, p5.mouseY);
        // sendMouse(p5.mouseX, p5.mouseY);
      }
    }
    setPrevMouseX(p5.mouseX);
    setPrevMouseY(p5.mouseY);
  };

  return <Sketch setup={setup} draw={drawLine} />;
};

export default connect()(Map);