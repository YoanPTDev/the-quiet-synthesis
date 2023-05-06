import {
  SET_GAME_STARTED,
  SET_ADVENTURELOG_EXPANDED,
  SET_ADVENTURELOG_INPUT_EXPANDED,
  SET_NOTEBOOK_EXPANDED,
  SET_SCARCITY_ABUNDANCE_EXPANDED,
  SET_DRAWING_ENABLED,
  SET_CARD_EXPANDED,
} from '../actions/types';

const DEFAULT_SETTINGS = {
  gameStarted: true,
  adventureLogExpanded: false,
  notebookExpanded: false,
  scarcityAbundanceLogExpanded: false,
  drawingEnabled: false,
  cardExpanded: false,
  adventureLogInputExpanded: false,
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
      case SET_ADVENTURELOG_INPUT_EXPANDED:
        return {
          ...state,
          adventureLogInputExpanded: action.adventureLogInputExpanded,
        };
    case SET_NOTEBOOK_EXPANDED:
      return {
        ...state,
        notebookExpanded: action.notebookExpanded,
      };
    case SET_SCARCITY_ABUNDANCE_EXPANDED:
      return {
        ...state,
        scarcityAbundanceLogExpanded: action.scarcityAbundanceLogExpanded,
      };
    case SET_DRAWING_ENABLED:
      return {
        ...state,
        drawingEnabled: action.drawingEnabled,
      };
    case SET_CARD_EXPANDED:
      return {
        ...state,
        cardExpanded: action.cardExpanded,
      };
    default:
      return state;
  }
};

export default settingsReducer;
