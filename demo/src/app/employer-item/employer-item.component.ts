import { Component, OnInit } from '@angular/core';
import { TableItem } from "@nodeart/ngfb_sortable_table";
import {Common} from "../common";
@Component({
  selector: 'tr [app-employer-item]',
  templateUrl: './employer-item.component.html',
  styleUrls: ['./employer-item.component.scss', '../item.scss']
})
export class EmployerItemComponent extends Common implements TableItem {
  constructor() {
    super();
  }
  
}
