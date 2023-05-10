import { ACTIONS } from '../../../utils/constants.mjs';

export const addPlayer = (socket) => () => {
  socket.emit(ACTIONS.ADD_PLAYER);
};
