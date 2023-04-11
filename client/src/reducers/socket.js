const INITIAL_STATE = {
  socket: null,
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECTED':
      return { ...state, socket: action.socket };
    default:
      return state;
  }
};

export default socketReducer;