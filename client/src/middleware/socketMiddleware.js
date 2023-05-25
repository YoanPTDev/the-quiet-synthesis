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
  expandIncompleteProjectPicker,
  expandAdventureLogInput,
  setSeason,
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
import { FONT } from '../constants';
import { startGameStore } from '../actions/settings';
import { fetchIncompleteProjects } from '../actions/incompleteProject';

let socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
  setupSocketListeners();
  socket.emit(DATA.GAME_STATE);
};

const setupSocketListeners = () => {
  if (socketInstance) {
    socketInstance.on(ACTIONS.ADD_DESCRIPTION, () => {
      console.log('ADD_DESCRIPTION');
      storeReference.dispatch(expandAdventureLogInput());
      fetchDirection({
        directions: 'Add a description',
        font: FONT.LARGE,
      });
    });

    socketInstance.on(ACTIONS.ADD_RESOURCES, () => {
      storeReference.dispatch(expandScarcityAbundanceLog());
      storeReference.dispatch(
        fetchDirection({
          directions:
            'Add an amount of scarcities equals to the amount of players, then transfer one of them to the abundance list',
          font: FONT.LARGE,
        })
      );
    });
    socketInstance.on(ACTIONS.ADD_ABUN_SCARC, (data) => {
      storeReference.dispatch(expandScarcityAbundanceLog());
      storeReference.dispatch(
        fetchDirection({
          directions: `Add a ${data}, then take your second action`,
          font: FONT.LARGE,
        })
      );
    });
    socketInstance.on(ACTIONS.SELECT_INCOMPLETE_PROJECT, () => {
      storeReference.dispatch(expandIncompleteProjectPicker());
      storeReference.dispatch(
        fetchDirection({
          directions: 'Pick a project',
          font: FONT.LARGE,
        })
      );
    });
    socketInstance.on(DATA.DRAWN_CARD, (data) => {
      storeReference.dispatch(fetchCard(data));
      storeReference.dispatch(
        fetchDirection({ directions: 'Choose a prompt', font: FONT.LARGE })
      );
    });
    socketInstance.on(DATA.INCOMPLETE_PROJECTS_LIST, (data) => {
      storeReference.dispatch(fetchIncompleteProjects(data));
    });
    socketInstance.on(SECOND_TURN.ACTION, () => {
      storeReference.dispatch(expandSecondTurnAction());
      fetchDirection({
        directions: 'Choose an action then resolve it',
        font: FONT.LARGE,
      });
    });
    socketInstance.on(UPDATE.PROJECT, (data) => {
      storeReference.dispatch(expandCompleteProjectInput());
      storeReference.dispatch(
        fetchDirection({
          directions: `${data.type} this project that 
            ${data.playerName} started: 
            ${data.description}`,
          font: FONT.SMALL,
        })
      );
    });
    socketInstance.on(ACTIONS.DISCUSS, () => {
      storeReference.dispatch(expandDiscussionInput());
      storeReference.dispatch(
        fetchDirection({
          directions: 'Discuss amongst yourselves',
          font: FONT.LARGE,
        })
      );
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
    socketInstance.on(UPDATE.NO_ONGOING_PROJECTS, () => {
      storeReference.dispatch(
        fetchDirection({
          directions: 'There are no ongoing project at this moment',
          font: FONT.LARGE,
        })
      );
      setTimeout(() => {
        socketInstance.emit(
          UPDATE.NO_ONGOING_PROJECTS,
          'There are no ongoing project at this moment'
        );
      }, 3000);
    });
    socketInstance.once(UPDATE.GAME_STARTED, () => {
      storeReference.dispatch(startGameStore());
      storeReference.dispatch(collapseScarcityAbundanceLog());
      fetchDirection({
        directions: 'The first week has started',
        font: FONT.LARGE,
      });
    });

    // UPDATE INFOS
    socketInstance.once(UPDATE.FIRST_PLAYER_GAME_PREP, () => {
      storeReference.dispatch(setFirstPlayer());
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
    socketInstance.on(UPDATE.LOGS, (data) => {
      storeReference.dispatch(fetchLog(data));
    });
    socketInstance.on(UPDATE.ACTION, (data) => {
      storeReference.dispatch(fetchOutOfTurnAction(data));
    });
    socketInstance.on(DATA.SEASON, (data) => {
      storeReference.dispatch(setSeason(data));
    });

    // GAME HAS COME TO AN END
    socketInstance.on(ACTIONS.END_GAME, (data) => {
      storeReference.dispatch(
        fetchDirection({
          directions: `The frost shephards have arrived ${data} weeks before the end of the year... 
        The game is over.\nYou can now talk about what
        the Frost Shepherds might have been, what their
        arrival might have meant for the community and conclude this magnificent story.`,
          font: FONT.LARGE,
        })
      );
    });

    // RECONNECTION
    socketInstance.on(DATA.GAME_STATE, (data) => {
      if (data.gameStarted) {
        storeReference.dispatch(startGameStore());
      }

      storeReference.dispatch(fetchIncompleteProjects(data.incompleteProjects));
      storeReference.dispatch(fetchLog(data.advLog));
      storeReference.dispatch(fetchNote(data.notebook));
      storeReference.dispatch(fetchScarcityAbundance(data.scar_abund));
      fetchDirection({
        directions: 'Reconnected...',
        font: FONT.LARGE,
      });
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
