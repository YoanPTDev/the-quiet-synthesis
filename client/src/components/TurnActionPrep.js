// components/TurnActionPrep.js
// interface similaire à TurnAction mais seulement visible 
// pendant la phase preparation de la partie
// qui permet aux joueurs de terminer leur tour ou leur 
// dessin lors du jeu, en utilisant un contexte de socket pour émettre des 
// événements et des actions Redux pour gérer l'état du jeu.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { startGame, prepGame } from '../actions/partie';
import { disableDrawing } from '../actions/settings';
import { fetchDirection } from '../actions/direction';
import { ACTIONS } from '../../../utils/constants.mjs';

const TurnActionPrep = ({
  prepGame,
  startGame,
  drawingEnabled,
  disableDrawing,
  isFirstPlayer,
  fetchDirection,
}) => {
  const socket = useContext(SocketContext);

  const handleDrawingEnd = () => {
    disableDrawing();
    socket.emit(ACTIONS.END_DRAWING);
    fetchDirection({ directions: 'Someone else is drawing...' });
  };

  const handleStartGame = () => {
    startGame();
  };

  return (
    <div>
      <button
        onClick={prepGame}
        style={{ marginLeft: '10px' }}>
        Prep game
      </button>
      {isFirstPlayer && (
        <button
          onClick={handleStartGame}
          style={{ marginLeft: '10px' }}>
          Start Game
        </button>
      )}
      {drawingEnabled && (
        <button
          onClick={handleDrawingEnd}
          style={{ marginLeft: '10px' }}>
          Consolidate drawing
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    drawingEnabled: state.settings.drawingEnabled,
    isFirstPlayer: state.settings.isFirstPlayer,
    gameStarted: state.settings.gameStarted,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { socket } = props;
  return {
    startGame: () => dispatch(startGame(socket)),
    prepGame: () => dispatch(prepGame(socket)),
    disableDrawing: () => dispatch(disableDrawing()),
    fetchDirection: (data) => dispatch(fetchDirection(data)),
  };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

const ConnectedTurnAction = componentConnector(TurnActionPrep);

const TurnActionPrepWrapper = (props) => {
  const socket = useContext(SocketContext);
  return (
    <ConnectedTurnAction
      {...props}
      socket={socket}
    />
  );
};

export default TurnActionPrepWrapper;
