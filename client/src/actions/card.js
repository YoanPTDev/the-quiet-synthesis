import { CARD, CARD_DRAW } from './types';

const API_ADDRESS = '/';

export const fetchCardSuccess = (cardJSON) => {
  const { card_id, suit, season, value, prompts } = cardJSON;
  return { type: CARD_DRAW.FETCH_SUCCESS, card_id, suit, season, value, prompts };
};

export const fetchCardError = (error) => {
  return { type: CARD_DRAW.FETCH_ERROR, message: error.message };
};

export const fetchCard = () => (dispatch) => {
  return fetch(`${API_ADDRESS}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('La requête pour retourner le deck a échoué.');
      }

      return response.json();
    })
    .then((json) => dispatch(fetchCardSuccess(json)))
    .catch((error) => dispatch(fetchCardError(error)));
};

export const fetchDrawCard = () => (dispatch) => {
  return fetch(`${API_ADDRESS}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('La requête pour retourner une carte a échoué');
      }

      return response.json();
    })
    .then((json) => {
      dispatch({
        type: CARD_DRAW.FETCH_SUCCESS,
        cards: json.cards,
      });
    })
    .catch((error) =>
      dispatch({ type: CARD_DRAW.FETCH_ERROR, message: error.message })
    );
};
