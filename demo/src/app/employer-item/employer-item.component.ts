import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Common } from "../common";
import { AlertComponent } from "../alert/alert.component";

interface Employer {
  name: string;
  country: string;
  address: string;
  phone: string;
  lookingFor: string;
  email: string;
}

@Component({
  selector: 'tr [app-employer-item]',
  templateUrl: './employer-item.component.html',
  styleUrls: ['../item.scss']
})
export class EmployerItemComponent extends Common implements OnInit {
  public item: Employer;
  public component: Component = AlertComponent;
  @Output('itemChange') public onItemChange: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit() {
    this.getImage('thumbnail');
  }

  shouldEmployerBeDeleted(remove) {
    if (remove) {
      this.onItemChange.emit(this.item);
    }
  }
}
