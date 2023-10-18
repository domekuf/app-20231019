import { createReducer, on } from '@ngrx/store';
import { Project } from 'model/project.model';
import { ProjectActions } from './projects.actions';

export const initialState: ReadonlyArray<Project> = [
]; 

export const projectsReducer = createReducer(
  initialState,
  on(ProjectActions.readProjects, (_state) => {return _state;}),
  on(ProjectActions.onReadProjectsSuccessful, (_state, {projects}) => projects),
  on(ProjectActions.onReadProjectsFailure, (_state) => {
    return [];
  }),
  on(ProjectActions.onCreateProjectSuccessful, (_state, {project}) => [..._state, project]),
  on(ProjectActions.onDeleteProjectSuccessful, (_state, {projects}) => projects),
)