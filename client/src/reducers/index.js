import cardReducer from './card';
import settingsReducer from './settings';

const rootReducer = {
  settings: settingsReducer,
  card: cardReducer
};

export default rootReducer;
