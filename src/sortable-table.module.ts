import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {
    MdIconRegistry,
    MdProgressBarModule,
    MdDialogModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SortableTableComponent } from "./components/sortable_table/sortable-table.component";
import { LoadingComponent } from "./components/loading/loading.component";

import { DialogDirective } from "./directives/dialog.directive";
import { SortableItemDirective } from "./directives/sortable-item.directive";
import { InfiniteScrollDirective } from "./directives/infinite-scroll.directive";

import { PriorityKeysPipe } from "./pipes/priority-keys.pipe";

import { SortableTableService } from "./services/sortable-table.service";

@NgModule({
  declarations: [
    SortableTableComponent,
    LoadingComponent,
    SortableItemDirective,
    DialogDirective,
    InfiniteScrollDirective,
    PriorityKeysPipe
  ],
  exports: [
    SortableTableComponent,
    LoadingComponent,
    SortableItemDirective,
    DialogDirective,
    InfiniteScrollDirective,
    PriorityKeysPipe
  ],
  providers: [
    SortableTableService,
    MdIconRegistry
  ],
  imports: [
    MdProgressBarModule,
    MdDialogModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule
  ]
})
export class NgFbSortableTableModule { }
