import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Map = () => {
  const [isPressed, setIsPressed] = useState(null);
  const [receivedIsPressed, setReceivedIsPressed] = useState(false);
  const [receivedData, setReceivedData] = useState({});
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
    const newSocket = io.connect('http://localhost:3001');
    // const newSocket = io.connect('http://thequietsynthesis.com:3001');
    setSocket(newSocket);
    newSocket.on('mouse', function (data) {
      setReceivedData(data); // Store the received data in the state

      if (!data.isPressed) {
        setPrevReceivedMouses(null, null); // Set previous mouse positions to null on mouseReleased event
        setReceivedIsPressed(false);
      } else {
        setPrevReceivedMouses(receivedMouseX, receivedMouseY); // Update previous mouse positions here
        setReceivedMouses(data.x, data.y);
        setReceivedIsPressed(true);

        if (data.newLineStart) {
          setPrevReceivedMouses(null, null);
        }
      }
    });
    return () => {
      newSocket.disconnect();
    };
  }, [receivedMouseX, receivedMouseY]);

  const sendMouse = (xpos, ypos, isPressed, newLineStart) => {
    let data = {
      x: xpos,
      y: ypos,
      isPressed: isPressed,
      newLineStart: newLineStart,
    };

    socket.emit('mouse', data);
  };

  const isMouseInsideCanvas = (p5) => {
    return (
      p5.mouseX >= 0 &&
      p5.mouseX <= p5.width &&
      p5.mouseY >= 0 &&
      p5.mouseY <= p5.height
    );
  };

  const drawLine = (p5) => {
    if (p5.mouseIsPressed && isMouseInsideCanvas(p5)) {
      setIsPressed(true);
      const newLineStart = prevMouseX === null && prevMouseY === null;

      if (!newLineStart) {
        p5.line(prevMouseX, prevMouseY, p5.mouseX, p5.mouseY);
      }

      sendMouse(p5.mouseX, p5.mouseY, isPressed, newLineStart);
      setPrevMouseX(p5.mouseX);
      setPrevMouseY(p5.mouseY);
    }
  };

  const drawReceivedLine = (p5) => {
    if (
      receivedIsPressed &&
      prevReceivedMouseX !== null &&
      prevReceivedMouseY !== null &&
      !receivedData.newLineStart // Check if newLineStart is false
    ) {
      p5.line(
        prevReceivedMouseX,
        prevReceivedMouseY,
        receivedMouseX,
        receivedMouseY
      );
      setPrevReceivedMouses(receivedMouseX, receivedMouseY);
    }
  };

  const mouseReleased = (p5) => {
    if (isMouseInsideCanvas(p5)) {
      setIsPressed(false);
      sendMouse(p5.mouseX, p5.mouseY, isPressed);
    }
    setPrevMouseX(null);
    setPrevMouseY(null);
  };

  const setReceivedMouses = (mouseX, mouseY) => {
    setReceivedMouseX(mouseX);
    setReceivedMouseY(mouseY);
  };

  const setPrevReceivedMouses = (mouseX, mouseY) => {
    if (!isPressed) {
      setPrevReceivedMouseX(mouseX);
      setPrevReceivedMouseY(mouseY);
    } else {
      setPrevReceivedMouseX(null);
      setPrevReceivedMouseY(null);
    }
  };

  const draw = (p5) => {
    drawLine(p5);
    drawReceivedLine(p5, receivedData);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseReleased={mouseReleased}
    />
  );
};

export default connect()(Map);
