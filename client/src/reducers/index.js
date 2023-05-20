import cardReducer from './card';
import settingsReducer from './settings';
import notebookReducer from './notebook.js';
import adventureLogReducer from './adventureLog';
import socketReducer from './socket';
import scarcityAbundanceReducer from './scarcityAbundance';
import outOfTurnActionReducer from './outOfTurnAction';
import directionsReducer from './directions';
import incompleteProjectsReducer from './incompleteProject';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer,
  socket: socketReducer,
  note: notebookReducer,
  log: adventureLogReducer,
  scarcity_abundance: scarcityAbundanceReducer,
  outOfTurnAction: outOfTurnActionReducer,
  direction: directionsReducer,
  incompleteProject: incompleteProjectsReducer,
};

export default rootReducer;
