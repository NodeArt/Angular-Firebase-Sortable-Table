import { Component, OnInit } from '@angular/core';
import { Common } from "../common";

@Component({
  selector: 'tr [app-employee-item]',
  templateUrl: './employee-item.component.html',
  styleUrls: ['../item.scss']
})
export class EmployeeItemComponent extends Common implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage('thumbnail');
  }
}
