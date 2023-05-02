import { ABUNDANCE } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  abundances: [],
};

const abundanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABUNDANCE.FETCH_SUCCESS:
      const { abundances } = action;
      console.log('abundanceReducer', abundances);
      return {
        ...state,
        abundances,
        fetchstate: fetchStates.success,
      };
    case ABUNDANCE.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default abundanceReducer;