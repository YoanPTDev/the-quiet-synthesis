import { SCARCITY } from './types';

export const fetchScarcitySuccess = (logJSON) => {
  const { scarcities } = logJSON;
  return {
    type: SCARCITY.FETCH_SUCCESS,
    scarcities,
  };
};

export const fetchScarcityError = (error) => {
  return { type: SCARCITY.FETCH_ERROR, message: error.message };
};

export const fetchScarcity = (data) => (dispatch) => {
  dispatch(fetchScarcitySuccess(data));
};