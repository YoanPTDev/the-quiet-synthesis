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
import { SocketContext } from '../middleware/socketcontext';
import { AnimatePresence } from 'framer-motion';

import { ACTIONS } from '../../../utils/constants.mjs';

const App = ({ gameStarted }) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      // Emit an event when the component mounts
      socket.emit(ACTIONS.ADD_PLAYER);
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
          </div>
          <AdventureLogInputWrapper />
          <DiscussionInputWrapper />
          <SecondTurnActionWrapper />
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

const componentConnector = connect(mapStateToProps, { startGame: startGameStore, cancelGame });

export default componentConnector(App);
