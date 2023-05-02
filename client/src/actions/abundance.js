import { ABUNDANCE } from './types';

export const fetchAbundanceSuccess = (logJSON) => {
  const { abundances } = logJSON;
  return {
    type: ABUNDANCE.FETCH_SUCCESS,
    abundances,
  };
};

export const fetchAbundanceError = (error) => {
  return { type: ABUNDANCE.FETCH_ERROR, message: error.message };
};

export const fetchAbundance = (data) => (dispatch) => {
  dispatch(fetchAbundanceSuccess(data));
};