import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Map = () => {
  const [isPressed, setIsPressed] = useState(null);
  const [socket, setSocket] = useState(null);
  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);
  const [prevReceivedMouseX, setPrevReceivedMouseX] = useState(null);
  const [prevReceivedMouseY, setPrevReceivedMouseY] = useState(null);
  const [receivedMouseX, setReceivedMouseX] = useState(null);
  const [receivedMouseY, setReceivedMouseY] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth - 400, window.innerHeight - 400).parent(
      canvasParentRef
    );
    p5.background(200);
  };

  useEffect(() => {
    console.log('mounted');

    // const newSocket = io.connect('http://localhost:3000');
    const newSocket = io.connect('http://thequietsynthesis.com:3001');
    setSocket(newSocket);
    newSocket.on('mouse', function (data) {
      if (!data.isPressed) {
        setPrevReceivedMouses(data.x, data.y);
      } else {
        setReceivedMouses(data.x, data.y);
      }
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMouse = (xpos, ypos, isPressed) => {
    let data = {
      x: xpos,
      y: ypos,
      isPressed: isPressed,
    };

    socket.emit('mouse', data);
  };

  const drawLine = (p5) => {
    if (p5.mouseIsPressed) {
      setIsPressed(true);
      if (prevMouseX !== null && prevMouseY !== null) {
        p5.line(prevMouseX, prevMouseY, p5.mouseX, p5.mouseY);
        sendMouse(p5.mouseX, p5.mouseY, isPressed);
      }

      setPrevMouseX(p5.mouseX);
      setPrevMouseY(p5.mouseY);
    }
  };

  const mouseReleased = (p5) => {
    setIsPressed(false);
    sendMouse(p5.mouseX, p5.mouseY, isPressed);
  }

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
      p5.line(
        prevReceivedMouseX,
        prevReceivedMouseY,
        receivedMouseX,
        receivedMouseY
      );
    }
    setPrevReceivedMouses(receivedMouseX, receivedMouseY);
  };

  return (
    <Sketch
      setup={setup}
      draw={(p5) => {
        drawLine(p5);
        drawReceivedLine(p5);
      }}
      mouseReleased={mouseReleased}
    />
  );
};

export default connect()(Map);
