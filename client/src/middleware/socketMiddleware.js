import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import {
  enableDrawing,
  expandSecondTurnAction,
  expandDiscussionInput,
  expandScarcityAbundanceLog,
  setFirstPlayer,
} from '../actions/settings';
import { fetchOutOfTurnAction } from '../actions/outOfTurnAction';
import { fetchDirection } from '../actions/direction';
import { fetchCard } from '../actions/card';

import {
  UPDATE,
  ACTIONS,
  SECOND_TURN,
  DATA,
} from '../../../utils/constants.mjs';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.once(UPDATE.FIRST_PLAYER_GAME_PREP, () => {
      console.log('FIRST_PLAYER_GAME_PREP');
      storeReference.dispatch(setFirstPlayer());
    });
    socketInstance.on(ACTIONS.ADD_RESOURCES, () => {
      console.log('add ressources');
      storeReference.dispatch(expandScarcityAbundanceLog());
    });
    socketInstance.on(UPDATE.FIRST_PLAYER_GAME_PREP, () => {
      console.log('first player game prep!');
    });
    socketInstance.on(DATA.DRAWN_CARD, (data) => {
      storeReference.dispatch(fetchCard(data));
    });
    socketInstance.on(SECOND_TURN.ACTION, () => {
      storeReference.dispatch(expandSecondTurnAction());
    });
    socketInstance.on(UPDATE.LOGS, (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on(UPDATE.ACTION, (data) => {
      storeReference.dispatch(fetchOutOfTurnAction(data));
      // storeReference.dispatch(
      //   fetchDirection({ directions: 'someone is playing' })
      // );
    });
    socketInstance.on(UPDATE.PROJECT, (data) => {
      console.log('UPDATE.PROJECT', data);
    });
    socketInstance.on(ACTIONS.DISCUSS, () => {
      storeReference.dispatch(expandDiscussionInput());
      storeReference.dispatch(fetchDirection({ directions: 'Discuss' }));
    });
    socketInstance.on(UPDATE.DISCUSSION, (data) => {
      storeReference.dispatch(fetchOutOfTurnAction(data));
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
