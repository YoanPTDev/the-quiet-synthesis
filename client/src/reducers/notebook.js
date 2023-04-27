// reducers/notebook.js
import { NOTE } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  notes: [],
};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE.FETCH_SUCCESS:
      const { notes } = action;
      return {
        ...state,
        notes,
        fetchstate: fetchStates.success,
      };
    case NOTE.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default notebookReducer;
