import { SCARCITY } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  scarcities: [],
};

const scarcityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCARCITY.FETCH_SUCCESS:
      const { scarcities } = action;
      return {
        ...state,
        scarcities,
        fetchstate: fetchStates.success,
      };
    case SCARCITY.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default scarcityReducer;
