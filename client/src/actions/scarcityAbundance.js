import { SCARCITY_ABUNDANCE } from './types';

export const fetchScarcityAbundanceSuccess = (logJSON) => {
  const { scarcities, abundances } = logJSON;
  return {
    type: SCARCITY_ABUNDANCE.FETCH_SUCCESS,
    scarcities,
    abundances,
  };
};

export const fetchScarcityAbundanceError = (error) => {
  return { type: SCARCITY_ABUNDANCE.FETCH_ERROR, message: error.message };
};

export const fetchScarcityAbundance = (data) => (dispatch) => {
  dispatch(fetchScarcityAbundanceSuccess(data));
};