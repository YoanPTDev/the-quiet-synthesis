import { LOG } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_LOG = {
  weekNb: '',
  playerId: '',
  cardDrawnId: '',
  promptChosen: '',
  message: '',
  actions: [],
};

const logReducer = (state = DEFAULT_LOG, action) => {
  switch (action.type) {
    case LOG.FETCH_SUCCESS:
      const { weekNb, playerId, cardDrawnId, promptChosen, actions } = action;
      
      return {
        ...state,
        weekNb,
        playerId,
        cardDrawnId,
        promptChosen,
        actions,
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

export default logReducer;
