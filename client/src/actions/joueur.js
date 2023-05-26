// actions/secondTurn.js
// collection d'actions qui sont utilisés pour envoyer des signaux au backend
// lié aux actions du joueur qui se connecte.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { ACTIONS } from '../../../utils/constants.mjs';

export const addPlayer = (socket) => () => {
  socket.emit(ACTIONS.ADD_PLAYER);
};
