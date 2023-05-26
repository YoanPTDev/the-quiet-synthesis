// actions/log.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux informations dans l'adventure log de L'application
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

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
