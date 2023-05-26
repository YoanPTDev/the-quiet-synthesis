// reducers/adventureLog.js
// "adventureLogReducer.js" définit le reducer pour gérer les actions sur les 
// logs d'aventure dans l'application, y compris la récupération réussie et 
// l'échec de la récupération des logs.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet


import { LOG } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_LOG = {
  logs: [],
};

const adventureLogReducer = (state = DEFAULT_LOG, action) => {
  switch (action.type) {
    case LOG.FETCH_SUCCESS:
      const { logs } = action;
      return {
        ...state,
        logs,
        fetchstate: fetchStates.success,
      };
    case LOG.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default adventureLogReducer;
