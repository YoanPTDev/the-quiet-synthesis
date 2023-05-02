import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import AdventureLogWrapper from './AdventureLogWrapper';
import NotebookWrapper from './NotebookWrapper';
import Map from './Map';
import Card from './Card';
import TurnActionWrapper from './TurnAction';
import { SocketContext } from '../middleware/socketcontext';

const App = ({ gameStarted, startGame, cancelGame }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      // Emit an event when the component mounts
      socket.emit('addPlayer');
    }
  }, [socket]);

  return (
    <div>
      <div className='action-buttons'>
        <h1>The Quiet Year</h1>
        <TurnActionWrapper />
        <div className='note-log-wrapper'>
          <AdventureLogWrapper />
          <NotebookWrapper />
        </div>
      </div>
      {gameStarted ? (
        <div>
          <button onClick={cancelGame}>Quit the adventure!</button>
          <Map className='map' />
          <div className='turn-action top-right component-container'>
            <Card />
          </div>
        </div>
      ) : (
        <div>
          <h3>A new adventure is on the horizon!</h3>
          <button onClick={startGame}>Go on an adventure!</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameStarted: state.settings.gameStarted,
  };
};

const componentConnector = connect(mapStateToProps, { startGame, cancelGame });

export default componentConnector(App);
