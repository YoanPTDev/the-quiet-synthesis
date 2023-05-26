// actions/incompleteProject.js
// collection d'actions de Redux qui sont utilisés pour modifier l'état 
// lié aux projets incomplets dans L'application
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import { INCOMPLETE_PROJECTS } from './types';

export const fetchIncompleteProjectsSuccess = (logJSON) => {
  const { incompleteProjects } = logJSON;
  return {
    type: INCOMPLETE_PROJECTS.FETCH_SUCCESS,
    incompleteProjects
  };
};

export const fetchIncompleteProjectsError = (error) => {
  return { type: INCOMPLETE_PROJECTS.FETCH_ERROR, message: error.message };
};

export const fetchIncompleteProjects = (data) => (dispatch) => {
  dispatch(fetchIncompleteProjectsSuccess(data));
};
