import { SCARCITY } from './types';

export const fetchScarcitySuccess = (logJSON) => {
  const { scarcities, abundances } = logJSON;
  return {
    type: SCARCITY.FETCH_SUCCESS,
    scarcities,
    abundances,
  };
};

export const fetchScarcityError = (error) => {
  return { type: SCARCITY.FETCH_ERROR, message: error.message };
};

export const fetchScarcity = (data) => (dispatch) => {
  dispatch(fetchScarcitySuccess(data));
};