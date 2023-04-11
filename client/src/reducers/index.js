import cardReducer from './card';
import settingsReducer from './settings';
import socketReducer from './socket';

const rootReducer = {
  socket: socketReducer,
  settings: settingsReducer,
  card: cardReducer
};

export default rootReducer;
