import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import {
  enableDrawing,
  expandSecondTurnAction,
  expandDiscussionInput,
} from '../actions/settings';
import { fetchOutOfTurnAction } from '../actions/outOfTurnAction';
import { fetchDirection } from '../actions/direction';

import { UPDATE, ACTIONS, SECOND_TURN } from '../../../utils/constants.mjs';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on(SECOND_TURN.ACTION, () => {
      storeReference.dispatch(expandSecondTurnAction());
    });
    socketInstance.on(UPDATE.LOGS, (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on(UPDATE.ACTION, (data) => {
      console.log('UPDATE.ACTION -> socketMiddlware', data);
      storeReference.dispatch(fetchOutOfTurnAction(data));
      storeReference.dispatch(
        fetchDirection({ directions: 'someone is playing' })
      );
    });
    socketInstance.on(ACTIONS.DISCUSS, () => {
      storeReference.dispatch(expandDiscussionInput());
      storeReference.dispatch(fetchDirection({ directions: 'Discuss' }));
    });
    socketInstance.on(UPDATE.DISCUSSION, (data) => {
      console.log('UPDATE_DISCUSSION', data);
    });
    socketInstance.on(UPDATE.NOTEBOOK, (data) => {
      storeReference.dispatch(fetchNote(data));
    });
    socketInstance.on(UPDATE.SCARCITY_ABUNDANCE, (data) => {
      storeReference.dispatch(fetchScarcityAbundance(data));
    });
    socketInstance.on(UPDATE.ENABLE_DRAWING, () => {
      storeReference.dispatch(enableDrawing());
      storeReference.dispatch(
        fetchDirection({ directions: 'Draw something on the map' })
      );
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
