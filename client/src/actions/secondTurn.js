import { SECOND_ACTION } from '../../../utils/constants.mjs';

export const actionDiscovery = (socket) => () => {
  socket.emit(SECOND_ACTION.DISCOVERY);
};

export const actionProject = (socket) => () => {
  socket.emit(SECOND_ACTION.PROJECT);
};

export const actionDiscussion = (socket) => () => {
  socket.emit(SECOND_ACTION.DISCUSSION);
};
