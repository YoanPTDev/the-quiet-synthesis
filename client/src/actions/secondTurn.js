// actions/secondTurn.js
// collection d'actions qui sont utilisés pour envoyer des signaux au backend
// lié aux actions du second tour qui ne requiert aucune carte
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { SECOND_ACTION, DATA } from '../../../utils/constants.mjs';

export const actionDiscovery = (socket) => () => {
  socket.emit(DATA.SAVE_ACTION, {type: SECOND_ACTION.DISCOVERY});
};

export const actionProject = (socket) => () => {
  socket.emit(DATA.SAVE_ACTION, {type: SECOND_ACTION.PROJECT});
};

export const actionDiscussion = (socket) => () => {
  socket.emit(DATA.SAVE_ACTION, {type: SECOND_ACTION.DISCUSSION});
};
