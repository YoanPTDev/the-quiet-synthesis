// actions/card.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux cartes dans L'application
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { CARD_DRAW } from './types';

export const fetchCardSuccess = (cardJSON) => {
  const { id, suit, season, value, prompts } = cardJSON;
  return {
    type: CARD_DRAW.FETCH_SUCCESS,
    id,
    suit,
    season,
    value,
    prompts,
  };
};

export const fetchCardError = (error) => {
  return { type: CARD_DRAW.FETCH_ERROR, message: error.message };
};

export const fetchCard = (data) => (dispatch) => {
  dispatch(fetchCardSuccess(data));
};
