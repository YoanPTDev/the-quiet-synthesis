import { LOG } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_LOG = {
  logs: [],
};

const adventureLogReducer = (state = DEFAULT_LOG, action) => {
  switch (action.type) {
    case LOG.FETCH_SUCCESS:
      const { weeks } = action;
      // console.log('reducer log', weeks);
      // console.log('reducer action', action);
      return {
        ...state,
        weeks,
        fetchstate: fetchStates.success,
      };
    case LOG.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default adventureLogReducer;
