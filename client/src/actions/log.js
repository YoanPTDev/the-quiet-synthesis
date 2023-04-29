import { LOG } from './types';

export const fetchLogSuccess = (logJSON) => {
  const { logs } = logJSON;
  console.log('logJSON', logJSON);
  console.log('logs', logs);
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
