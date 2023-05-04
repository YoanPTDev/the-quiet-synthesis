import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import { enableDrawing } from '../actions/settings';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on('updateLogs', (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on('updateAction', (data) => {
      console.log('updateAction', data);
    });
    socketInstance.on('updateNotebook', (data) => {
      storeReference.dispatch(fetchNote(data));
    });
    socketInstance.on('updateScarcityAbundance', (data) => {
      storeReference.dispatch(fetchScarcityAbundance(data));
    });
    socketInstance.on('enableDrawing', () => {
      storeReference.dispatch(enableDrawing());
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
