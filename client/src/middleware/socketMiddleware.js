import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on('updateLogs', (data) => {
      console.log('data', data);
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
    return next(action);
  };
};
