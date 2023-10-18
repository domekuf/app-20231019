import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectAllProjects } from 'state/projects.selectors';
import { ProjectActions } from 'state/projects.actions';
import { Project } from 'model/project.model';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public projects$ = this._store.select(selectAllProjects);
  public newProject: Project = this.newProjectReset()
  constructor(
    private _store: Store,
    ) {}
  ngOnInit(): void {
    this._store.dispatch(ProjectActions.readProjects());
  }
  onAdd() {
    this._store.dispatch(ProjectActions.createProject({project: this.newProject}));
    this.newProject = this.newProjectReset();
  }

  onDelete(id: number) {
    this._store.dispatch(ProjectActions.deleteProject({id}));
  }

  newProjectReset(): Project {
    return {
      id: 0,
      title: '',
      brief: '',
      details: '',
    };
  }


}
