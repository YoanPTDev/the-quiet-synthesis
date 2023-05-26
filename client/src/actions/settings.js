// actions/settings.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état lié aux settings dans L'application
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
  SET_SEASON,
} from './types';

export const setSeason = ({ season }) => {
  return {
    type: SET_SEASON,
    season: season,
  };
};

export const startGameStore = () => {
  return {
    type: SET_GAME_STARTED,
    gameStarted: true,
  };
};

export const cancelGame = () => {
  return {
    type: SET_GAME_STARTED,
    gameStarted: false,
  };
};

export const expandAdventureLog = () => {
  return {
    type: SET_ADVENTURELOG_EXPANDED,
    adventureLogExpanded: true,
  };
};

export const collapseAdventureLog = () => {
  return {
    type: SET_ADVENTURELOG_EXPANDED,
    adventureLogExpanded: false,
  };
};

export const expandIncompleteProjectPicker = () => {
  return {
    type: SET_INCOMPLETE_PROJECT_PICKER_EXPANDED,
    incompleteProjectPickerExpanded: true,
  };
};

export const collapseIncompleteProjectPicker = () => {
  return {
    type: SET_INCOMPLETE_PROJECT_PICKER_EXPANDED,
    incompleteProjectPickerExpanded: false,
  };
};

export const expandAdventureLogInput = () => {
  return {
    type: SET_ADVENTURELOG_INPUT_EXPANDED,
    adventureLogInputExpanded: true,
  };
};

export const collapseAdventureLogInput = () => {
  return {
    type: SET_ADVENTURELOG_INPUT_EXPANDED,
    adventureLogInputExpanded: false,
  };
};

export const expandCompleteProjectInput = () => {
  return {
    type: SET_COMPLETE_PROJECT_INPUT_EXPANDED,
    completeProjectInputExpanded: true,
  };
};

export const collapseCompleteProjectInput = () => {
  return {
    type: SET_COMPLETE_PROJECT_INPUT_EXPANDED,
    completeProjectInputExpanded: false,
  };
};

export const expandDiscussionInput = () => {
  return {
    type: SET_DISCUSSION_INPUT_EXPANDED,
    discussionInputExpanded: true,
  };
};

export const collapseDiscussionInput = () => {
  return {
    type: SET_DISCUSSION_INPUT_EXPANDED,
    discussionInputExpanded: false,
  };
};

export const expandNotebook = () => {
  return {
    type: SET_NOTEBOOK_EXPANDED,
    notebookExpanded: true,
  };
};

export const collapseNotebook = () => {
  return {
    type: SET_NOTEBOOK_EXPANDED,
    notebookExpanded: false,
  };
};

export const expandScarcityAbundanceLog = () => {
  return {
    type: SET_SCARCITY_ABUNDANCE_EXPANDED,
    scarcityAbundanceLogExpanded: true,
  };
};

export const collapseScarcityAbundanceLog = () => {
  return {
    type: SET_SCARCITY_ABUNDANCE_EXPANDED,
    scarcityAbundanceLogExpanded: false,
  };
};

export const enableDrawing = () => {
  return {
    type: SET_DRAWING_ENABLED,
    drawingEnabled: true,
  };
};

export const disableDrawing = () => {
  return {
    type: SET_DRAWING_ENABLED,
    drawingEnabled: false,
  };
};

export const setFirstPlayer = () => {
  return {
    type: SET_FIRST_PLAYER,
    isFirstPlayer: true,
  };
};

export const expandCard = () => {
  return {
    type: SET_CARD_EXPANDED,
    cardExpanded: true,
  };
};

export const collapseCard = () => {
  return {
    type: SET_CARD_EXPANDED,
    cardExpanded: false,
  };
};

export const expandSecondTurnAction = () => {
  return {
    type: SET_SECOND_TURN_ACTION_EXPANDED,
    secondTurnActionExpanded: true,
  };
};

export const collapseSecondTurnAction = () => {
  return {
    type: SET_SECOND_TURN_ACTION_EXPANDED,
    secondTurnActionExpanded: false,
  };
};
