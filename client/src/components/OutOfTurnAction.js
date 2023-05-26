// components/OutOfTurnAction.js
// composant React qui, en fonction de l'état du jeu provenant du Redux 
// store, affiche les actions effectuées hors tour par les joueurs, y 
// compris le type d'action, la description et toute discussion associée.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';

const OutOfTurnAction = (props) => {
  const { outOfTurnActions, prompt, cardExpanded } = props;

  const renderOutOfTurnActions = () => {
    if (outOfTurnActions) {
      return (
        <div>
          <div>{outOfTurnActions.type}</div>
          <div>{prompt}</div>
          <div>
            {outOfTurnActions.description}
          </div>
          <div>
            {outOfTurnActions.discussion &&
              outOfTurnActions.discussion.map(
                ({ player, statement }, index) => (
                  <div key={index}>
                    <div>{player}</div>
                    <div>{statement}</div>
                  </div>
                )
              )}
          </div>
        </div>
      );
    }
  };

  if (outOfTurnActions.length === 0 || cardExpanded || outOfTurnActions.type === 'Game Over') {
    return null;
  }

  return (
    <div className='out-of-turn-action-container'>
      <div className='out-of-turn-action-list'>{renderOutOfTurnActions()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    outOfTurnActions: state.outOfTurnAction.outOfTurnActions,
    prompt: state.outOfTurnAction.prompt,
    cardExpanded: state.settings.cardExpanded,
  };
};

export default connect(mapStateToProps)(OutOfTurnAction);
