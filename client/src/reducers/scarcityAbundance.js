import { SCARCITY_ABUNDANCE } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  scarcities: [],
  abundances: []
};

const scarcityAbundanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCARCITY_ABUNDANCE.FETCH_SUCCESS:
      const { scarcities, abundances } = action;
      return {
        ...state,
        scarcities,
        abundances,
        fetchstate: fetchStates.success,
      };
    case SCARCITY_ABUNDANCE.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default scarcityAbundanceReducer;
