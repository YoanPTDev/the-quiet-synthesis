import { fetchLog } from '../actions/log';
import { fetchNote } from '../actions/note';
import { fetchScarcityAbundance } from '../actions/scarcityAbundance';
import {
  enableDrawing,
  expandSecondTurnAction,
  expandDiscussionInput,
  expandScarcityAbundanceLog,
  setFirstPlayer,
  collapseScarcityAbundanceLog,
  expandCompleteProjectInput,
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
import { startGameStore } from '../actions/settings';
import { fetchIncompleteProjects } from '../actions/incompleteProject';

let socketInstance;

let FONT = {
  SMALL: 'small-direction',
  LARGE: 'large-direction',
};

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.once(UPDATE.FIRST_PLAYER_GAME_PREP, () => {
      storeReference.dispatch(setFirstPlayer());
    });
    socketInstance.once(UPDATE.GAME_STARTED, () => {
      storeReference.dispatch(startGameStore());
      storeReference.dispatch(collapseScarcityAbundanceLog());
    });
    socketInstance.on(ACTIONS.ADD_RESOURCES, () => {
      storeReference.dispatch(expandScarcityAbundanceLog());
    });
    socketInstance.on(DATA.DRAWN_CARD, (data) => {
      storeReference.dispatch(fetchCard(data));
    });
    socketInstance.on(DATA.INCOMPLETE_PROJECTS_LIST, (data) => {
      storeReference.dispatch(fetchIncompleteProjects(data));
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
      storeReference.dispatch(expandCompleteProjectInput());
      console.log(data.description, data.playerName);
      storeReference.dispatch(
        fetchDirection({
          directions:
            'Complete this project that ' +
            data.playerName +
            ' started: ' +
            data.description,
          font: FONT.SMALL,
        })
      );
    });
    socketInstance.on(ACTIONS.DISCUSS, () => {
      storeReference.dispatch(expandDiscussionInput());
      storeReference.dispatch(
        fetchDirection({ directions: 'Discuss', font: FONT.LARGE })
      );
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
        fetchDirection({
          directions: 'Draw something on the map',
          font: FONT.LARGE,
        })
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
