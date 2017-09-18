import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableContentDirective } from './directives/sortable-content.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { NgFbSortableTableComponent } from './components/ngfb-sortable-table/ngfb-sortable-table.component';

@NgModule({
  declarations: [
    NgFbSortableTableComponent,
    SortableContentDirective,
    InfiniteScrollDirective
  ],
  imports: [ CommonModule ],
  exports: [ NgFbSortableTableComponent ]
})
export class NgFbSortableTableModule { }
