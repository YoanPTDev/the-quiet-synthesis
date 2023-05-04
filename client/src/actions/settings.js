import {
  SET_GAME_STARTED,
  SET_ADVENTURELOG_EXPANDED,
  SET_NOTEBOOK_EXPANDED,
  SET_SCARCITY_ABUNDANCE_EXPANDED,
  SET_DRAWING_ENABLED,
  SET_CARD_EXPANDED
} from './types';

export const startGame = () => {
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