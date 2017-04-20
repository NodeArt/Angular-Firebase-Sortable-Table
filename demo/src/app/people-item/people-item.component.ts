import { Component, OnInit } from '@angular/core';
import { Common } from "../common";
@Component({
  selector: 'tr [app-people-item]',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss', '../item.scss']
})
export class PeopleItemComponent extends Common implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage('thumbnail');
  }
}
