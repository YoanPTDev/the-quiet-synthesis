import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { addPlayer } from '../actions/joueur';
import { startGame } from '../actions/partie';
import { endTurn } from '../actions/partie';

const TurnAction = ({ addPlayer, startGame, endTurn }) => {
  return (
    <div>
      <button onClick={addPlayer}>Ajouter un joueur</button>
      <button onClick={startGame}>commencer Partie</button>
      <button onClick={endTurn}>Terminer tour</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const { socket } = props;
  return {
    addPlayer: () => dispatch(addPlayer(socket)),
    startGame: () => dispatch(startGame(socket)),
    endTurn: () => dispatch(endTurn(socket)),
  };
};

const componentConnector = connect(null, mapDispatchToProps);

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
