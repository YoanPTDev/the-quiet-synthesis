import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Map = (props) => {
  let socket;

  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.background(200);
  };

  useEffect(() => {
    console.log('mounted');
    let socket = io.connect('http://localhost:3000');
    socket.on('mouse', function (data) {
      console.log('Got: ' + data.x + ' ' + data.y);
      // Draw a blue circle
      fill(0, 0, 255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMouse = (xpos, ypos) => {
    let data = {
      x: xpos,
      y: ypos,
    };

    socket.emit('mouse', data);
  };

  const drawLine = (p5) => {
    if (p5.mouseIsPressed) {
      if (prevMouseX !== null && prevMouseY !== null) {
        p5.line(prevMouseX, prevMouseY, p5.mouseX, p5.mouseY);
        sendMouse(p5.mouseX, p5.mouseY);
      }
    }
    setPrevMouseX(p5.mouseX);
    setPrevMouseY(p5.mouseY);
  };

  return (
    <Sketch
      setup={setup}
      draw={drawLine}
    />
  );
};

export default connect()(Map);
