import { SECOND_ACTION_DISCOVERY, SECOND_ACTION_PROJECT, SECOND_ACTION_DISCUSSION } from "../../../utils/constants.mjs";

export const actionDiscovery = (socket) => () => {
  socket.emit(SECOND_ACTION_DISCOVERY);
};

export const actionProject = (socket) => () => {
  socket.emit(SECOND_ACTION_PROJECT);
};

export const actionDiscussion = (socket) => () => {
  socket.emit(SECOND_ACTION_DISCUSSION);
};

