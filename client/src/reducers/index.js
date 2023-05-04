import cardReducer from './card';
import settingsReducer from './settings';
import notebookReducer from './notebook.js'
import adventureLogReducer from './adventureLog';
import socketReducer from './socket';
import scarcityAbundanceReducer from './scarcityAbundance';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer,
  socket: socketReducer,
  note: notebookReducer,
  log: adventureLogReducer,
  scarcity_abundance: scarcityAbundanceReducer,
};

export default rootReducer;
