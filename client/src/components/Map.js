import Sketch from 'react-p5';
import { connect } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import { enableDrawing, disableDrawing } from '../actions/settings';
import { SocketContext } from '../middleware/socketcontext';

const Map = (props) => {
  const socket = useContext(SocketContext);

  const { disableDrawing, drawingEnabled } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [prevMouse, setPrevMouse] = useState({ x: null, y: null });

  const [receivedIsPressed, setReceivedIsPressed] = useState(false);
  const [receivedMouse, setReceivedMouse] = useState({ x: null, y: null });
  const [prevReceivedMouse, setPrevReceivedMouse] = useState({
    x: null,
    y: null,
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.background(200);
  };

  useEffect(() => {
    if (socket) {
      socket.on('mouse', function (data) {
        console.log('data', data);

        if (!data.isPressed || data.isReleased) {
          setPrevReceivedMouse({ x: null, y: null });
          setReceivedMouse({ x: null, y: null });
        } else {
          setPrevReceivedMouse({ ...receivedMouse });
          setReceivedMouse({ x: data.x, y: data.y });
        }
        setReceivedIsPressed(data.isPressed);
      });

      return () => {
        socket.off('mouse');
      };
    }
  }, [socket, receivedMouse]);

  const sendMouse = (xpos, ypos, isPressed, isReleased) => {
    let data = {
      x: xpos,
      y: ypos,
      isPressed: isPressed,
      isReleased: isReleased,
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
    if (drawingEnabled) {
      if (p5.mouseIsPressed && isMouseInsideCanvas(p5)) {
        setIsPressed(true);
  
        if (prevMouse.x !== null && prevMouse.y !== null) {
          p5.stroke(100, 0, 200);
          p5.line(prevMouse.x, prevMouse.y, p5.mouseX, p5.mouseY);
        }
  
        sendMouse(p5.mouseX, p5.mouseY, isPressed);
        setPrevMouse({ x: p5.mouseX, y: p5.mouseY });
      } else {
        setIsPressed(false);
        setPrevMouse({ x: null, y: null });
      }
    }
  };

  const drawReceivedLine = (p5) => {
    if (
      receivedIsPressed &&
      prevReceivedMouse.x !== null &&
      prevReceivedMouse.y !== null
    ) {
      p5.stroke(255, 0, 100);
      p5.line(
        prevReceivedMouse.x,
        prevReceivedMouse.y,
        receivedMouse.x,
        receivedMouse.y
      );
      setPrevReceivedMouse({ ...receivedMouse });
    } else if (!receivedIsPressed) {
      setPrevReceivedMouse({ x: null, y: null });
    }
  };

  const mouseReleased = (p5) => {
    setIsPressed(false);
    sendMouse(p5.mouseX, p5.mouseY, isPressed, true);
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

const mapStateToProps = (state) => {
  return {
    drawingEnabled: state.settings.drawingEnabled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    disableDrawing: () => dispatch(disableDrawing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
