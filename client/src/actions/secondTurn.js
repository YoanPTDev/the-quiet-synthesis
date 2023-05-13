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
