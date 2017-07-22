import { Component, OnInit, Input } from '@angular/core';
import { ItemComponent } from '@nodeart/ngfb-sortable-table';
import { database } from 'firebase';

@Component({
  selector: 'table-item',
  template: '<div>item</div>',
  styles: [`
    div {
      color: red;
    }
  `]
})
export class TableItemComponent implements ItemComponent, OnInit {
  @Input() ref: database.DataSnapshot;
  @Input() index: number;

  ngOnInit() {
  }
}
