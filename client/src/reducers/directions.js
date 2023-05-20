import { DIRECTIONS } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_DIRECTIONS = {
  directions: [''],
};

const directionsReducer = (state = DEFAULT_DIRECTIONS, action) => {
  switch (action.type) {
    case DIRECTIONS.FETCH_SUCCESS:
      const { directions, font } = action;
      return {
        ...state,
        directions,
        font,
        fetchstate: fetchStates.success,
      };
    case DIRECTIONS.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default directionsReducer;
