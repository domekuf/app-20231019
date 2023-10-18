import { Project } from 'model/project.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectProjects = createFeatureSelector<ReadonlyArray<Project>>('projects');
 

export const selectAllProjects = createSelector(
  selectProjects,
  (state: ReadonlyArray<Project>) => {console.log('selecting state', state); return state}
);
