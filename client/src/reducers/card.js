// reducers/card.js
// "cardReducer" définit le reducer pour gérer les actions sur les 
// cartes dans l'application, y compris la récupération réussie et 
// l'échec de la récupération des cartes.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { CARD_DRAW } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_CARD = {
  id: '',
  suit: '',
  season: '',
  value: '',
  message: '',
  prompts: [],
};

const cardReducer = (state = DEFAULT_CARD, action) => {
  switch (action.type) {
    case CARD_DRAW.FETCH_SUCCESS:
      const { id, suit, season, value, prompts } = action;
      
      return {
        ...state,
        id,
        suit,
        season,
        value,
        prompts,
        fetchstate: fetchStates.success,
      };
    case CARD_DRAW.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default cardReducer;
