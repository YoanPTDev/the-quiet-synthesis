import { ADD_PLAYER } from "../../../utils/constants";

export const addPlayer = (socket) => () => {
  socket.emit(ADD_PLAYER);
};
