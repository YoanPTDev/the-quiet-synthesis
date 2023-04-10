import {
  SET_GAME_STARTED,
  SET_ADVENTURELOG_EXPANDED,
  SET_NOTEBOOK_EXPANDED,
} from '../actions/types';

const DEFAULT_SETTINGS = {
  gameStarted: true,
  adventureLogExpanded: false,
  notebookExpanded: false,
};

const settingsReducer = (state = DEFAULT_SETTINGS, action) => {
  switch (action.type) {
    case SET_GAME_STARTED: 
      return {
        ...state,
        gameStarted: action.gameStarted,
      };
    case SET_ADVENTURELOG_EXPANDED:
      return {
        ...state,
        adventureLogExpanded: action.adventureLogExpanded,
      };
    case SET_NOTEBOOK_EXPANDED:
      return {
        ...state,
        notebookExpanded: action.notebookExpanded,
      };
    default:
      return state;
  }
};

export default settingsReducer;
