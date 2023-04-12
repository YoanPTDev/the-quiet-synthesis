export const addPlayer = (socket) => (dispatch) => {
  socket.emit('addPlayer');
};
