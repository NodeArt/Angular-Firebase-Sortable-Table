import { Component, OnInit } from '@angular/core';
import { Common } from "../common";

interface Employee {
  name: string;
  age: number;
  gender: string;
  country: string;
  job: string;
  cv: string;
  inSearch: boolean;
  favoriteFramework: string;
}

@Component({
  selector: 'tr [app-employee-item]',
  templateUrl: './employee-item.component.html',
  styleUrls: ['../item.scss']
})
export class EmployeeItemComponent extends Common implements OnInit {
  public item: Employee;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage('thumbnail');
  }
}
