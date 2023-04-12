import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { fetchCard } from '../actions/card';
import { addPlayer } from '../actions/joueur';
import { startGame } from '../actions/partie';
import { endTurn } from '../actions/partie';

const DrawCard = ({ fetchCard, addPlayer, startGame, endTurn }) => {
  return (
    <div>
      <button onClick={fetchCard}>Pige une carte</button>
      <button onClick={addPlayer}>Ajouter un joueur</button>
      <button onClick={startGame}>commencer Partie</button>
      <button onClick={endTurn}>Terminer tour</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  const { socket } = props;
  return {
    fetchCard: () => dispatch(fetchCard(socket)),
    addPlayer: () => dispatch(addPlayer(socket)),
    startGame: () => dispatch(startGame(socket)),
    endTurn: () => dispatch(endTurn(socket)),
  };
};

const componentConnector = connect(null, mapDispatchToProps);

const ConnectedDrawCard = componentConnector(DrawCard);

const DrawCardWrapper = (props) => {
  const socket = useContext(SocketContext);
  return (
    <ConnectedDrawCard
      {...props}
      socket={socket}
    />
  );
};

export default DrawCardWrapper;
