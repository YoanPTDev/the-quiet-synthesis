import { LOG } from './types';

export const fetchLogSuccess = (logJSON) => {
  const { weekNb, playerId, cardDrawnId, promptChosen, actions } = logJSON;
  return {
    type: LOG.FETCH_SUCCESS,
    weekNb,
    playerId,
    cardDrawnId,
    promptChosen,
    actions,
  };
};

export const fetchLogError = (error) => {
  return { type: LOG.FETCH_ERROR, message: error.message };
};

export const fetchLog = (data) => (dispatch) => {
  const logObject = JSON.parse(data);
  dispatch(fetchLogSuccess(logObject));
};
