import { NOTE } from './types';

export const fetchNoteSuccess = (logJSON) => {
  const { notes } = logJSON;
  console.log('notes', notes);
  console.log('logJSON', logJSON);
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
