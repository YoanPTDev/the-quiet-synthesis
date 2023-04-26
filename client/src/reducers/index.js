import cardReducer from './card';
import settingsReducer from './settings';
import notebookReducer from './notebook.js'
import logReducer from './log.js';
import socketReducer from './socket';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer,
  socket: socketReducer,
  note: notebookReducer,
  log: logReducer,
};

export default rootReducer;
