import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { startGameStore, cancelGame } from '../actions/settings';
import AdventureLogWrapper from './AdventureLogWrapper';
import AdventureLogInputWrapper from './AdventureLogInputWrapper';
import DiscussionInputWrapper from './DiscussionInputWrapper';
import NotebookWrapper from './NotebookWrapper';
import ScarcityAbundanceWrapper from './ScarcityAbundanceWrapper';
import ActionDirector from './ActionDirector';
import Map from './Map';
import Card from './Card';
import OutOfTurnAction from './OutOfTurnAction';
import TurnActionWrapper from './TurnAction';
import TurnActionPrepWrapper from './TurnActionPrep';
import SecondTurnActionWrapper from './SecondTurnAction';
import CompleteProjectInputWrapper from './CompleteProjectInputWrapper';
import IncompleteProjectsPickerWrapper from './IncompleteProjectsPickerWrapper';
import { SocketContext } from '../middleware/socketcontext';
import { AnimatePresence } from 'framer-motion';

import { ACTIONS, DATA } from '../../../utils/constants.mjs';

const App = ({ gameStarted }) => {
  const socket = useContext(SocketContext);

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  useEffect(() => {
    if (socket) {
      let uuid = localStorage.getItem('uuid');
      if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem('uuid', uuid);
      }

      // Emit an event when the component mounts
      socket.emit(ACTIONS.ADD_PLAYER, uuid);
      socket.emit(DATA.GAME_STATE);
    }
  }, [socket]);

  return (
    <div>
      <div className='action-buttons'>
        <h3>The Quiet Year</h3>
        <ActionDirector />
        {gameStarted ? <TurnActionWrapper /> : <TurnActionPrepWrapper />}
        <div className='note-log-wrapper'>
          <div className='toggle-button-wrapper'>
            <AdventureLogWrapper />
            <NotebookWrapper />
            <ScarcityAbundanceWrapper />
            <IncompleteProjectsPickerWrapper />
            <CompleteProjectInputWrapper />
            <AdventureLogInputWrapper />
            <DiscussionInputWrapper />
            <SecondTurnActionWrapper />
          </div>
        </div>
      </div>
      <div>
        <Map className='map' />
        <AnimatePresence>
          <div className='turn-action center component-container'>
            <Card />
          </div>
        </AnimatePresence>
        <div className='turn-action top-right component-container'>
          <OutOfTurnAction />
        </div>
        <div className='bottom-right component-container'></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameStarted: state.settings.gameStarted,
  };
};

const componentConnector = connect(mapStateToProps, {
  startGame: startGameStore,
  cancelGame,
});

export default componentConnector(App);
