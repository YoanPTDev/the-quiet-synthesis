import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on('updatedLogs', (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on('updateNotebook', (data) => {
      storeReference.dispatch(fetchNote(data));
    });
  }
};

let storeReference;

export const socketMiddleware = (store) => {
  storeReference = store;
  setupSocketListeners();

  return (next) => (action) => {
    console.log('next', next);
    console.log('action', action);
    return next(action);
  };
};
