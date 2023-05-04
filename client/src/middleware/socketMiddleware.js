import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchAbundance } from '../actions/abundance';
import { fetchScarcity } from '../actions/scarcity';
import { enableDrawing } from '../actions/settings';
import { fetchOutOfTurnAction } from '../actions/outOfTurnAction';

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
      storeReference.dispatch(fetchOutOfTurnAction(data));
    });
    socketInstance.on('updateNotebook', (data) => {
      storeReference.dispatch(fetchNote(data));
    });
    socketInstance.on('updateScarcity', (data) => {
      storeReference.dispatch(fetchScarcity(data));
    });
    socketInstance.on('updateAbundance', (data) => {
      console.log('updateAbundance', data);
      storeReference.dispatch(fetchAbundance(data));
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
