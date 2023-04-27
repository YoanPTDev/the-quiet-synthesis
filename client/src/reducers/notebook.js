// reducers/notebook.js
import { NOTE } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  data: [],
};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE.FETCH_SUCCESS:
      const { id, value } = action;
      return {
        ...state,
        id,
        value,
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
