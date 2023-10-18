import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Project } from 'model/project.model';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProjectActions } from './projects.actions';


import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
  getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.readProjects),
      switchMap(() => {
        const projects = <ReadonlyArray<Project>> JSON.parse(localStorage.getItem('projects') || '[]');
        return of(projects).pipe(
          map(projects => ProjectActions.onReadProjectsSuccessful({projects})),
          catchError(error => of(ProjectActions.onReadProjectsFailure(error)))
        )
      })
    )
  )

  postProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.createProject),
      switchMap(({project}) => {
        const projects = <Project[]> JSON.parse(localStorage.getItem('projects') || '[]');
        if (!project.title) {
          return throwError(() => new Error('Title is mandatory'));
        }
        const newProject = {...project};
        if (projects.length === 0) {
          newProject.id = 1;
        } else {
          newProject.id = projects.reduce((maxId, p) => Math.max(maxId, p.id), projects[0].id) + 1;
        }
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        this.snackBar.open(`Project with title ${project.title} created!`);
        return of(newProject).pipe(
          map(proj => {
            return ProjectActions.onCreateProjectSuccessful({project: proj})
          }),
        )
      }),
      catchError(error => {
        this.snackBar.open(error.toString());
        return of(ProjectActions.onCreateProjectFailure({error}))
      })
    )
  )

  deleteProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      switchMap(({id}) => {
        const projects = (<Project[]> JSON.parse(localStorage.getItem('projects') || '[]')).filter(p => p.id !== id);
        localStorage.setItem('projects', JSON.stringify(projects));
        this.snackBar.open(`Project with id ${id} deleted!`);
        return of(projects).pipe(
          map(_ => {
            return ProjectActions.onDeleteProjectSuccessful({projects})
          }),
        )
      }),
      catchError(error => {
        this.snackBar.open(error.toString());
        return of(ProjectActions.onDeleteProjectFailure({error}))
      })
    )
  )
}