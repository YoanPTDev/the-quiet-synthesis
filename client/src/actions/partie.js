export const startGame = (socket) => (dispatch) => {
  socket.emit('startGame');
};
