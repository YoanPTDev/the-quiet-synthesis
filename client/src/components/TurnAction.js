// components/TurnAction.js
// bouton qui permet aux joueurs de terminer leur tour ou leur 
// dessin lors du jeu, en utilisant un contexte de socket pour émettre des 
// événements et des actions Redux pour gérer l'état du jeu.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { addPlayer } from '../actions/joueur';
import { startGame, endTurn, prepGame } from '../actions/partie';
import { disableDrawing } from '../actions/settings';
import { fetchDirection } from '../actions/direction';
import { ACTIONS } from '../../../utils/constants.mjs';
import { FONT } from '../constants';

const TurnAction = ({
  endTurn,
  drawingEnabled,
  disableDrawing,
  fetchDirection,
}) => {

  const socket = useContext(SocketContext);
  
  const handleDrawingEnd = () => {
    disableDrawing();
    socket.emit(ACTIONS.END_DRAWING);
    fetchDirection({
      directions: 'Add a description...',
      font: FONT.LARGE,
    })
  };

  return (
    <div>
      <button
        onClick={endTurn}
        style={{ marginLeft: '10px' }}>
        Terminer tour
      </button>
      {drawingEnabled && (
        <button
          onClick={handleDrawingEnd}
          style={{ marginLeft: '10px' }}>
          Terminer dessin
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { drawingEnabled: state.settings.drawingEnabled };
};

const mapDispatchToProps = (dispatch, props) => {
  const { socket } = props;
  return {
    addPlayer: () => dispatch(addPlayer(socket)),
    startGame: () => dispatch(startGame(socket)),
    endTurn: () => dispatch(endTurn(socket)),
    prepGame: () => dispatch(prepGame(socket)),
    disableDrawing: () => dispatch(disableDrawing()),
    fetchDirection: (data) => dispatch(fetchDirection(data)),
  };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

const ConnectedTurnAction = componentConnector(TurnAction);

const TurnActionWrapper = (props) => {
  const socket = useContext(SocketContext);
  return (
    <ConnectedTurnAction
      {...props}
      socket={socket}
    />
  );
};

export default TurnActionWrapper;
