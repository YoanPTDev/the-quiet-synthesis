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
