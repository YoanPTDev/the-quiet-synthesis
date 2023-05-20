import { DIRECTIONS } from './types';

export const fetchDirectionSuccess = (props) => {
  const { directions, font } = props;
  console.log('font', font);
  return {
    type: DIRECTIONS.FETCH_SUCCESS,
    font,
    directions,
  };
};

export const fetchDirectionError = (error) => {
  return { type: DIRECTIONS.FETCH_ERROR, message: error.message };
};

export const fetchDirection = (data) => (dispatch) => {
  dispatch(fetchDirectionSuccess(data));
};
