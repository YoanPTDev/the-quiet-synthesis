import { SocketContext } from '../middleware/socketcontext';
import { useContext } from 'react';
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

export const fetchCard = (socket) => (dispatch) => {
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
};
