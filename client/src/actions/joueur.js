import { ADD_PLAYER } from "../../../utils/constants.mjs";

export const addPlayer = (socket) => () => {
  socket.emit(ADD_PLAYER);
};
