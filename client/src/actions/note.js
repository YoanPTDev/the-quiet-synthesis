import { NOTE } from './types';

export const fetchNoteSuccess = (logJSON) => {
  const { id, value } = logJSON;
  return {
    type: NOTE.FETCH_SUCCESS,
    id,
    value,
  };
};

export const fetchNoteError = (error) => {
  return { type: NOTE.FETCH_ERROR, message: error.message };
};

export const fetchNote = (data) => (dispatch) => {
  const noteObject = JSON.parse(data);
  dispatch(fetchNoteSuccess(noteObject));
};
