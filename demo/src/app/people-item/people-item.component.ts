import {Component, OnInit} from '@angular/core';
import { TableItem } from "@nodeart/ngfb_sortable_table";
import { Common } from "../common";
@Component({
  selector: 'tr [app-people-item]',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss', '../item.scss']
})
export class PeopleItemComponent extends Common implements TableItem, OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage().then((url : string) => {
      this.imageUrl = url;
      console.log(this.imageUrl);
    })
  }
}
