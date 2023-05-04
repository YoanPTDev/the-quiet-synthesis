import { OUT_OF_TURN_ACTION } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_OUT_OF_TURN_ACTION = {
  outOfTurnActions: [],
};

const outOfTurnActionReducer = (state = DEFAULT_OUT_OF_TURN_ACTION, action) => {
  switch (action.type) {
    case OUT_OF_TURN_ACTION.FETCH_SUCCESS:
      const { outOfTurnActions } = action;
      return {
        ...state,
        outOfTurnActions,
        fetchstate: fetchStates.success,
      };
    case OUT_OF_TURN_ACTION.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default outOfTurnActionReducer;
