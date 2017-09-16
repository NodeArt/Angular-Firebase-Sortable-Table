import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSidenavModule, MdButtonModule, MdToolbarModule, MdIconModule, MdProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgFbSortableTableModule } from '../../';

import { TableItemComponent } from './table-item/table-item.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableContainerComponent } from './table-container/table-container.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    TableItemComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TableContainerComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdProgressBarModule,
    NgFbSortableTableModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TableItemComponent,
    TableHeaderComponent,
    TableFooterComponent,
    LoadingComponent
  ]
})
export class AppModule { }
