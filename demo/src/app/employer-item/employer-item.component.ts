import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Common } from "../common";
import { AlertComponent } from "../alert/alert.component";
@Component({
  selector: 'tr [app-employer-item]',
  templateUrl: './employer-item.component.html',
  styleUrls: ['./employer-item.component.scss', '../item.scss']
})
export class EmployerItemComponent extends Common implements OnInit {
  private component: Component = AlertComponent;
  @Output('itemChange') public onItemChange: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage('thumbnail');
  }

  shouldEmployerBeDeleted(data) {
    this.onItemChange.emit(Object.assign(data, this.item));
  }
}
