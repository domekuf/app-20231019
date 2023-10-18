import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Project } from 'model/project.model';

export const ProjectActions = createActionGroup({
  source: 'Projects',
  events: {
    'Create Project': props<{project: Project}>(),
    'On Create Project Successful': props<{project: Project}>(),
    'On Create Project Failure': props<{error: any}>(),
    'Read Projects': emptyProps(),
    'On Read Projects Successful': props<{projects: ReadonlyArray<Project>}>(),
    'On Read Projects Failure': props<{error: any}>(),
    'Delete Project': props<{id: number}>(),
    'On Delete Project Successful': props<{projects: ReadonlyArray<Project>}>(),
    'On Delete Project Failure': props<{error: any}>(),
  }
});