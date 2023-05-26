// actions/note.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux notes dans le notebook de L'application
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { NOTE } from './types';

export const fetchNoteSuccess = (logJSON) => {
  const { notes } = logJSON;
  return {
    type: NOTE.FETCH_SUCCESS,
    notes,
  };
};

export const fetchNoteError = (error) => {
  return { type: NOTE.FETCH_ERROR, message: error.message };
};

export const fetchNote = (data) => (dispatch) => {
  dispatch(fetchNoteSuccess(data));
};
