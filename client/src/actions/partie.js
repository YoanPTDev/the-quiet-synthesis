// actions/partie.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux actions possibles dans la partie
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { ACTIONS } from '../../../utils/constants.mjs';

export const startGame = (socket) => () => {
  socket.emit(ACTIONS.START_GAME);
};

export const endTurn = (socket) => () => {
  socket.emit(ACTIONS.END_TURN);
};

export const prepGame = (socket) => () => {
  console.log('prep');
  socket.emit(ACTIONS.PREP_GAME);
};
