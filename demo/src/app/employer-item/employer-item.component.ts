import { Component, OnInit } from '@angular/core';
import {Common} from "../common";
@Component({
  selector: 'tr [app-employer-item]',
  templateUrl: './employer-item.component.html',
  styleUrls: ['./employer-item.component.scss', '../item.scss']
})
export class EmployerItemComponent extends Common implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage().then((url : string) => this.imageUrl = url)
  }
  
}
