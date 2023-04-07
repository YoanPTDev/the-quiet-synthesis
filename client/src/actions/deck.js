import { DECK, DECK_DRAW } from './types';

const API_ADDRESS = '/';

export const fetchDeckSuccess = (deckJSON) => {
  const { _id, name, cards } = deckJSON;

  return { type: DECK.FETCH_SUCCESS, _id, name, cards };
};

export const fetchDeckError = (error) => {
  return { type: DECK.FETCH_ERROR, message: error.message };
};

export const fetchDeck = () => (dispatch) => {
  return fetch(`${API_ADDRESS}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('La requête pour retourner le deck a échoué.');
      }

      return response.json();
    })
    .then((json) => dispatch(fetchDeckSuccess(json)))
    .catch((error) => dispatch(fetchDeckError(error)));
};

export const fetchDrawCard = () => (dispatch) => {
  return fetch(`${API_ADDRESS}`)
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('La requête pour retourner une carte a échoué');
    }

    return response.json();
  })
  .then(json => {
    dispatch({
      type: DECK_DRAW.FETCH_SUCCESS,
      cards: json.cards
    });
  })
  .catch((error) =>
      dispatch({ type: DECK_DRAW.FETCH_ERROR, message: error.message })
    );
}