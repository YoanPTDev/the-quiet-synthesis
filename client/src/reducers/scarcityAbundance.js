// reducers/scarcityAbundance.js
// "scarcityAbundanceReducer" définit le reducer pour gérer les actions sur les 
// scarcities et les abondances dans l'application, y compris la récupération réussie et 
// l'échec de la récupération de ces éléments.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { SCARCITY_ABUNDANCE } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  scarcities: [],
  abundances: []
};

const scarcityAbundanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCARCITY_ABUNDANCE.FETCH_SUCCESS:
      const { scarcities, abundances } = action;
      return {
        ...state,
        scarcities,
        abundances,
        fetchstate: fetchStates.success,
      };
    case SCARCITY_ABUNDANCE.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default scarcityAbundanceReducer;
