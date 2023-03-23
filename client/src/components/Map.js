import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Map = () => {
  const [socket, setSocket] = useState(null);
  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);
  const [prevReceivedMouseX, setPrevReceivedMouseX] = useState(null);
  const [prevReceivedMouseY, setPrevReceivedMouseY] = useState(null);
  const [receivedMouseX, setReceivedMouseX] = useState(null);
  const [receivedMouseY, setReceivedMouseY] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.background(200);
  };

  useEffect(() => {
    console.log('mounted');
    const newSocket = io.connect('http://localhost:3000');
    setSocket(newSocket);
    newSocket.on('mouse', function (data) {
      console.log('Got: ' + data.x + ' ' + data.y);
      setReceivedMouses(data.x, data.y);
    });
    return () => {
      newSocket.disconnect();
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

  const setReceivedMouses = (mouseX, mouseY) => {
    setReceivedMouseX(mouseX);
    setReceivedMouseY(mouseY);
  };

  const setPrevReceivedMouses = (mouseX, mouseY) => {
    setPrevReceivedMouseX(mouseX);
    setPrevReceivedMouseY(mouseY);
  };

  const drawReceivedLine = (p5) => {
    if (prevReceivedMouseX !== null && prevReceivedMouseY !== null) {
      p5.line(prevReceivedMouseX, prevReceivedMouseY, receivedMouseX, receivedMouseY);
    }
    setPrevReceivedMouses(receivedMouseX, receivedMouseY)
  };

  return (
    <Sketch
      setup={setup}
      draw={(p5) => {
        drawLine(p5);
        drawReceivedLine(p5);
      }}
    />
  );
};

export default connect()(Map);
