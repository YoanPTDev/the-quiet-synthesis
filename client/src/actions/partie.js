export const startGame = (socket) => (dispatch) => {
  socket.emit('startGame');
};

export const endTurn = (socket) => (dispatch) => {
  socket.emit('endTurn');
};

