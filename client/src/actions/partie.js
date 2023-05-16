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
