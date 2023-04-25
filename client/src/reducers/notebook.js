// reducers/notebook.js
import { SET_NOTEBOOK_DATA } from '../actions/types';

const initialState = {
  data: [],
};

export const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTEBOOK_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
