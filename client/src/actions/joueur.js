export const addPlayer = (socket) => () => {
  socket.emit('addPlayer');
};
