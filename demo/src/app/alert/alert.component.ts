/**
 * Created by SinceTV on 16.03.17.
 */
import { Component } from '@angular/core';
import { MdDialogRef } from "@angular/material";

export class AlertInput {
  msg: string;
  title: string;
  ok: string;
  err: string;
}

@Component({
  selector: 'alert',
  template: `
      <h1>{{data.title}}</h1>
      <h3>{{data.msg}}</h3>
      <md-dialog-actions align="end">
          <button md-button color="warn" (click)="dialogRef.close(true)">{{data.ok}}</button>
          <button md-button color="primary" (click)="dialogRef.close(false)">{{data.err}}</button>
      </md-dialog-actions>
  `,
  styles: [`
      :host {
          display: block;
      }
      h1, h3 {
          color: white;
      }
  `]
})
export class AlertComponent {
  public data: AlertInput;
  constructor(public dialogRef: MdDialogRef<AlertComponent>) {}
}