import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) private _data: string) { }

  ngOnInit(): void {
  }

  public get data(): string{
    return this._data;
  }

}
