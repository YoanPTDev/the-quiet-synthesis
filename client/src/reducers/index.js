import cardReducer from './card';
import settingsReducer from './settings';
import socketReducer from './socket';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer
};

export default rootReducer;
