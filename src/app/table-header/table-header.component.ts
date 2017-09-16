import { Component, OnInit, Inject } from '@angular/core';
import { NgFbSortableTableEventsService , EventConfig } from '../../../';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  constructor(@Inject(NgFbSortableTableEventsService) private tableEvents: Subject<EventConfig>) {}

  ngOnInit() {
    this.tableEvents.next({ event: '123' });
  }

}
