import { io } from 'socket.io-client';
import { CARD_DRAW } from './types';

// const socket = io('http://localhost:3001');
const socket = io('http://thequietsynthesis.com:3001');

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

export const fetchCard = () => (dispatch) => {
  socket.emit('drawCard');

  socket.on('cardData', (cardData) => {
    const cardDataObject = JSON.parse(cardData);
    dispatch(fetchCardSuccess(cardDataObject));
    socket.off('cardData');
    console.log('socket off');
  });

  socket.on('error', (error) => {
    dispatch(fetchCardError(error));
    socket.off('error');
  });

  // return fetch(`${API_ADDRESS}`)
  //   .then((response) => {
  //     if (response.status !== 200) {
  //       throw new Error('La requête pour retourner une carte a échoué.');
  //     }

  //     return response.json();
  //   })
  //   .then((json) => dispatch(fetchCardSuccess(json)))
  //   .catch((error) => dispatch(fetchCardError(error)));
};

// export const fetchDrawCard = () => (dispatch) => {
//   return fetch(`${API_ADDRESS}`)
//     .then((response) => {
//       if (response.status !== 200) {
//         throw new Error('La requête pour retourner une carte a échoué');
//       }

//       return response.json();
//     })
//     .then((json) => {
//       dispatch({
//         type: CARD_DRAW.FETCH_SUCCESS,
//         cards: json.cards,
//       });
//     })
//     .catch((error) =>
//       dispatch({ type: CARD_DRAW.FETCH_ERROR, message: error.message })
//     );
// };
