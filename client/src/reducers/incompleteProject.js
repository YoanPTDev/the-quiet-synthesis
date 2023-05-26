// reducers/incompleteProject.js
// "incompleteProjectsReducer" définit le reducer pour gérer les actions sur les 
// projets incomplets dans l'application, y compris la récupération réussie et 
// l'échec de la récupération des projets incomplets.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { INCOMPLETE_PROJECTS } from '../actions/types';
import fetchStates from './fetchStates';

const initialState = {
  incompleteProjects: [],
};

const incompleteProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCOMPLETE_PROJECTS.FETCH_SUCCESS:
      const { incompleteProjects } = action;
      return {
        ...state,
        incompleteProjects,
        fetchstate: fetchStates.success,
      };
    case INCOMPLETE_PROJECTS.FETCH_ERROR:
      return {
        ...state,
        message: action.message,
        fetchstate: fetchStates.error,
      };
    default:
      return state;
  }
};

export default incompleteProjectsReducer;
