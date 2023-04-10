import { CARD_DRAW } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_CARD = {
  id: '',
  suit: '',
  season: '',
  value: '',
  message: '',
  prompts: [],
};

const cardReducer = (state = DEFAULT_CARD, action) => {
  console.log('action', action);
  switch (action.type) {
    case CARD_DRAW.FETCH_SUCCESS:
      ({ id, suit, season, value, prompts } = action);
      return {
        ...state,
        id,
        suit,
        season,
        value,
        prompts,
        fetchstate: fetchStates.success,
      };
    case CARD_DRAW.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default cardReducer;
