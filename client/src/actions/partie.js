export const startGame = (socket) => () => {
  socket.emit('startGame');
};

export const endTurn = (socket) => () => {
  socket.emit('endTurn');
};

