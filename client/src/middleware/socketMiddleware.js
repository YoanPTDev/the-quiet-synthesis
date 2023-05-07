import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import { enableDrawing, expandAdventureLogInput } from '../actions/settings';
import { fetchOutOfTurnAction } from '../actions/outOfTurnAction';

import { DISCUSS, UPDATE_LOGS, UPDATE_ACTION, UPDATE_NOTEBOOK, UPDATE_SCARCITY_ABUNDANCE, ENABLE_DRAWING, UPDATE_DISCUSSION } from '../../../utils/constants.mjs';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  console.log('Setting up updateAction listener')
  if (socketInstance) {
    socketInstance.on(UPDATE_LOGS, (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on(UPDATE_ACTION, (data) => {
      storeReference.dispatch(fetchOutOfTurnAction(data));
    });
    socketInstance.on(DISCUSS, () => {
      storeReference.dispatch(expandDiscussionInput());
    });
    socketInstance.on(UPDATE_DISCUSSION, (data) => {
      console.log('update', data);
    });
    socketInstance.on(UPDATE_NOTEBOOK, (data) => {
      storeReference.dispatch(fetchNote(data));
    });
    socketInstance.on(UPDATE_SCARCITY_ABUNDANCE, (data) => {
      storeReference.dispatch(fetchScarcityAbundance(data));
    });
    socketInstance.on(ENABLE_DRAWING, () => {
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
