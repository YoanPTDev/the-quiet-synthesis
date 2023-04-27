import { LOG } from './types';

export const fetchLogSuccess = (logJSON) => {
  const { weeks } = logJSON;
  console.log( 'logJSON', logJSON );
  console.log( 'logs', weeks );
  return {
    type: LOG.FETCH_SUCCESS,
    weeks,
  };
};

export const fetchLogError = (error) => {
  return { type: LOG.FETCH_ERROR, message: error.message };
};

export const fetchLog = (data) => (dispatch) => {
  dispatch(fetchLogSuccess(data));
};
