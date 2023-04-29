import { LOG } from './types';

export const fetchLogSuccess = (logJSON) => {
  const { logs } = logJSON;
  return {
    type: LOG.FETCH_SUCCESS,
    logs,
  };
};

export const fetchLogError = (error) => {
  return { type: LOG.FETCH_ERROR, message: error.message };
};

export const fetchLog = (data) => (dispatch) => {
  dispatch(fetchLogSuccess(data));
};
