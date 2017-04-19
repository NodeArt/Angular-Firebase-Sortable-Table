import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";

import { SortableTableComponent } from "./components/sortable_table/sortable-table.component";

import { DialogDirective } from "./directives/dialog.directive";
import { SortableItemDirective } from "./directives/sortable-item.directive";
import { InfiniteScrollDirective } from "./directives/infinite-scroll.directive";

import { PriorityKeysPipe } from "./pipes/priority-keys.pipe";

import { SortableTableService } from "./services/sortable-table.service";


export function declarations() {
  return [
    SortableTableComponent,
    SortableItemDirective,
    DialogDirective,
    InfiniteScrollDirective,
    PriorityKeysPipe
  ];
}

@NgModule({
  declarations: declarations(),
  exports: [
    SortableTableComponent,
    SortableItemDirective,
    DialogDirective,
    InfiniteScrollDirective,
    PriorityKeysPipe
  ],
  providers: [
    SortableTableService
  ],
  imports: [
    MaterialModule.forRoot(),
    CommonModule,
    FormsModule
  ]
})
export class NgFbSortableTableModule { }
