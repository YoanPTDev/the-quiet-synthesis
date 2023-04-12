import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../middleware/socketcontext';

const Map = () => {
  const socket = useContext(SocketContext);

  const [isPressed, setIsPressed] = useState(null);
  const [prevMouseX, setPrevMouseX] = useState(null);
  const [prevMouseY, setPrevMouseY] = useState(null);
  
  const [receivedData, setReceivedData] = useState({});
  const [receivedIsPressed, setReceivedIsPressed] = useState(false);

  const [receivedMouseX, setReceivedMouseX] = useState(null);
  const [receivedMouseY, setReceivedMouseY] = useState(null);
  const [prevReceivedMouseX, setPrevReceivedMouseX] = useState(null);
  const [prevReceivedMouseY, setPrevReceivedMouseY] = useState(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.background(200);
  };

  useEffect(() => {
    // const newSocket = io.connect('http://thequietsynthesis.com:3001');
    if (socket) {
      socket.on('mouse', function (data) {
        setReceivedData(data); // Store the received data in the state
  
        if (!data.isPressed) {
          setPrevReceivedMouses(null, null); // Set previous mouse positions to null on mouseReleased event
          setReceivedIsPressed(false);
        } else {
          setPrevReceivedMouses(receivedMouseX, receivedMouseY); // Update previous mouse positions here
          setReceivedMouses(data.x, data.y);
          setReceivedIsPressed(true);
        }
      });
      return () => {
        socket.off('mouse');
      };
    }
  }, [socket, receivedMouseX, receivedMouseY]);

  const sendMouse = (xpos, ypos, isPressed) => {
    let data = {
      x: xpos,
      y: ypos,
      isPressed: isPressed,
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

      if (!newLineStart) {
        p5.stroke(100, 0, 200);
        p5.line(prevMouseX, prevMouseY, p5.mouseX, p5.mouseY);
      }

      sendMouse(p5.mouseX, p5.mouseY, isPressed);
      setPrevMouseX(p5.mouseX);
      setPrevMouseY(p5.mouseY);
    }
  };

  const drawReceivedLine = (p5) => {
    if (
      receivedIsPressed &&
      prevReceivedMouseX !== null &&
      prevReceivedMouseY !== null
    ) {
      p5.stroke(255, 0, 100);
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
      sendMouse(p5.mouseX, p5.mouseY, isPressed, true);
    }
    setPrevMouseX(null);
    setPrevMouseY(null);
  };

  const setReceivedMouses = (mouseX, mouseY) => {
    setReceivedMouseX(mouseX);
    setReceivedMouseY(mouseY);
  };

  const setPrevReceivedMouses = (mouseX, mouseY) => {
    if (!receivedIsPressed) {
      setPrevReceivedMouseX(mouseX);
      setPrevReceivedMouseY(mouseY);
    } else {
      setPrevReceivedMouseX(null);
      setPrevReceivedMouseY(null);
    }
  };

  const draw = (p5) => {
    drawLine(p5);
    drawReceivedLine(p5);
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
