// actions/outOfTurnAction.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux actions hors tours pour que tout le monde ait
// une idée d'où on en est dans la partie 
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { OUT_OF_TURN_ACTION } from './types';

export const fetchOutOfTurnActionSuccess = (logJSON) => {
  const { action, prompt } = logJSON;
  return {
    type: OUT_OF_TURN_ACTION.FETCH_SUCCESS,
    outOfTurnActions: action,
    prompt,
  };
};

export const fetchOutOfTurnActionError = (error) => {
  return { type: OUT_OF_TURN_ACTION.FETCH_ERROR, message: error.message };
};

export const fetchOutOfTurnAction = (data) => (dispatch) => {
  dispatch(fetchOutOfTurnActionSuccess(data));
};
