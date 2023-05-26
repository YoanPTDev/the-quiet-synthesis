// actions/direction.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux directions donnés aux joueurs dans L'application
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { DIRECTIONS } from './types';

export const fetchDirectionSuccess = (props) => {
  const { directions, font } = props;
  console.log('font', font);
  return {
    type: DIRECTIONS.FETCH_SUCCESS,
    font,
    directions,
  };
};

export const fetchDirectionError = (error) => {
  return { type: DIRECTIONS.FETCH_ERROR, message: error.message };
};

export const fetchDirection = (data) => (dispatch) => {
  dispatch(fetchDirectionSuccess(data));
};
