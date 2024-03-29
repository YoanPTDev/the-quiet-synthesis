// reducers/settings.js
// "settingsReducer" définit le reducer pour gérer les actions sur les paramètres 
// de l'application, y compris l'état du jeu, la visibilité de différentes sections 
// et l'état d'activité du dessin.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import {
  SET_GAME_STARTED,
  SET_ADVENTURELOG_EXPANDED,
  SET_ADVENTURELOG_INPUT_EXPANDED,
  SET_DISCUSSION_INPUT_EXPANDED,
  SET_NOTEBOOK_EXPANDED,
  SET_SCARCITY_ABUNDANCE_EXPANDED,
  SET_DRAWING_ENABLED,
  SET_CARD_EXPANDED,
  SET_SECOND_TURN_ACTION_EXPANDED,
  SET_FIRST_PLAYER,
  SET_COMPLETE_PROJECT_INPUT_EXPANDED,
  SET_INCOMPLETE_PROJECT_PICKER_EXPANDED,
  SET_SEASON
} from '../actions/types';

const DEFAULT_SETTINGS = {
  gameStarted: false,
  adventureLogExpanded: false,
  adventureLogInputExpanded: false,
  notebookExpanded: false,
  scarcityAbundanceLogExpanded: false,
  cardExpanded: false,
  drawingEnabled: false,
  discussionInputExpanded: false,
  secondTurnActionExpanded: false,
  isFirstPlayer: false,
  completeProjectInputExpanded: false,
  incompleteProjectPickerExpanded: false,
  season: 'Spring',
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
    case SET_COMPLETE_PROJECT_INPUT_EXPANDED:
      return {
        ...state,
        completeProjectInputExpanded: action.completeProjectInputExpanded,
      };
    case SET_INCOMPLETE_PROJECT_PICKER_EXPANDED:
      return {
        ...state,
        incompleteProjectPickerExpanded: action.incompleteProjectPickerExpanded,
      };
    case SET_DISCUSSION_INPUT_EXPANDED:
      return {
        ...state,
        discussionInputExpanded: action.discussionInputExpanded,
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
    case SET_FIRST_PLAYER:
      return {
        ...state,
        isFirstPlayer: action.isFirstPlayer,
      };
    case SET_CARD_EXPANDED:
      return {
        ...state,
        cardExpanded: action.cardExpanded,
      };
    case SET_SECOND_TURN_ACTION_EXPANDED:
      return {
        ...state,
        secondTurnActionExpanded: action.secondTurnActionExpanded,
      };
    case SET_SEASON:
      return { ...state, season: action.season };
    default:
      return state;
  }
};

export default settingsReducer;
