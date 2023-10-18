import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'app-20231019';
  public urlToShare = window.location.toString();
  constructor(
    private _snackBar: MatSnackBar,
    ) {
  }
  public onShare() {
    this._snackBar.open(`${this.urlToShare} copied to clipboard, paste it wherever!`)
  }
}