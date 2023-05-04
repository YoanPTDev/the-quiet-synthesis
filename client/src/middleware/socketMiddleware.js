import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import { enableDrawing } from '../actions/settings';
import { fetchOutOfTurnAction } from '../actions/outOfTurnAction';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  console.log('Setting up updateAction listener')
  if (socketInstance) {
    socketInstance.on('updateLogs', (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on('updateAction', (data) => {
      storeReference.dispatch(fetchOutOfTurnAction(data));
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
