// reducers/direction.js
// "directionsReducer" définit le reducer pour gérer les actions sur les 
// directions dans l'application, y compris la récupération réussie et 
// l'échec de la récupération des directions.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { DIRECTIONS } from '../actions/types';
import { FONT } from '../constants';
import fetchStates from './fetchStates';

const DEFAULT_DIRECTIONS = {
  directions: ['Welcome, for this new year is full of hope and despair'],
  font: FONT.LARGE,
};

const directionsReducer = (state = DEFAULT_DIRECTIONS, action) => {
  switch (action.type) {
    case DIRECTIONS.FETCH_SUCCESS:
      const { directions, font } = action;
      return {
        ...state,
        directions,
        font,
        fetchstate: fetchStates.success,
      };
    case DIRECTIONS.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default directionsReducer;
