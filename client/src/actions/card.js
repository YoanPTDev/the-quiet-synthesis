import { CARD_DRAW } from './types';

export const fetchCardSuccess = (cardJSON) => {
  const { id, suit, season, value, prompts } = cardJSON;
  return {
    type: CARD_DRAW.FETCH_SUCCESS,
    id,
    suit,
    season,
    value,
    prompts,
  };
};

export const fetchCardError = (error) => {
  return { type: CARD_DRAW.FETCH_ERROR, message: error.message };
};

export const fetchCard = (data) => (dispatch) => {
  console.log('fetched', data);
  const cardDataObject = JSON.parse(data);
  dispatch(fetchCardSuccess(cardDataObject));
};
