import cardReducer from './card';
import settingsReducer from './settings';
import notebookReducer from './notebook.js'
import adventureLogReducer from './adventureLog';
import socketReducer from './socket';
import scarcityReducer from './scarcity';
import abundanceReducer from './abundance';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer,
  socket: socketReducer,
  note: notebookReducer,
  log: adventureLogReducer,
  scarcity: scarcityReducer,
  abundance: abundanceReducer,
};

export default rootReducer;
