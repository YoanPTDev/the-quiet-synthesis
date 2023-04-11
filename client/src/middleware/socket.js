// import { receiveMessage, userJoined, userLeft } from './yourActionsFile'; // Import actions for handling socket events

export const socketMiddleware = (socket) => {
  return (store) => {
    // Add your socket event listeners here
    socket.on('message', (message) => {
      // Dispatch an action when a new message is received
      store.dispatch(receiveMessage(message));
    });

    socket.on('userJoined', (user) => {
      // Dispatch an action when a user joins
      store.dispatch(userJoined(user));
    });

    socket.on('userLeft', (user) => {
      // Dispatch an action when a user leaves
      store.dispatch(userLeft(user));
    });

    // Add more event listeners as needed

    return (next) => (action) => {
      return next(action);
    };
  };
};