import { DIRECTIONS } from './types';

export const fetchDirectionSuccess = (props) => {
  const { directions } = props;
  return {
    type: DIRECTIONS.FETCH_SUCCESS,
    directions,
  };
};

export const fetchDirectionError = (error) => {
  return { type: DIRECTIONS.FETCH_ERROR, message: error.message };
};

export const fetchDirection = (data) => (dispatch) => {
  console.log('fetchDirection', data);
  dispatch(fetchDirectionSuccess(data));
};
