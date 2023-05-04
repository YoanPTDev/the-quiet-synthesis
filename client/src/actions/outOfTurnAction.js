import { OUT_OF_TURN_ACTION } from './types';

export const fetchOutOfTurnActionSuccess = (logJSON) => {
  const { outOfTurnActions } = logJSON;
  return {
    type: OUT_OF_TURN_ACTION.FETCH_SUCCESS,
    outOfTurnActions,
  };
};

export const fetchOutOfTurnActionError = (error) => {
  return { type: OUT_OF_TURN_ACTION.FETCH_ERROR, message: error.message };
};

export const fetchOutOfTurnAction = (data) => (dispatch) => {
  dispatch(fetchOutOfTurnActionSuccess(data));
};
