// App.js
// l'application avec tous les composantes parent
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

// Toute l'architecture de l'application est basé sur l'architecture de David Joseph Katz
// Apprise dans le bootcamp https://www.udemy.com/course/react-js-and-redux-mastering-web-apps/

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

  // Généré par chatGPT
  function generateUUID() {
    // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' est le modèle d'un UUID version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        // | 0 est utilisé pour convertir le nombre en entier
        var r = (Math.random() * 16) | 0,
          // Si c est 'x', utilise r, sinon utilise (r & 0x3) | 0x8 pour générer un nombre entre 8 et 11
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        // Convertir le nombre en base 16 (hexadécimal) et le renvoyer comme chaîne
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

      socket.emit(ACTIONS.ADD_PLAYER, uuid);
    }
  }, [socket]);

  return (
    <div>
      <AnimatePresence>
        <div className='action-buttons'>
          <div className='TQY-logo'></div>
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
      </AnimatePresence>
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
