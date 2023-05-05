import { END_TURN, START_GAME } from "../../../utils/constants.mjs";

export const startGame = (socket) => () => {
  socket.emit(START_GAME);
};

export const endTurn = (socket) => () => {
  socket.emit(END_TURN);
};

