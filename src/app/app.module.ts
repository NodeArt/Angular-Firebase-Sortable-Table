import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSidenavModule, MdButtonModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgFbSortableTableModule } from '@nodeart/ngfb-sortable-table';

import { initializeApp } from 'firebase';
import { TableItemComponent } from './table-item/table-item.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableContainerComponent } from './table-container/table-container.component';

initializeApp({
  apiKey: 'AIzaSyBbKmIPEGoxk1PEOL4yctQmRpl14DQA9h0',
  authDomain: 'ngfb-sortable-table-demo.firebaseapp.com',
  databaseURL: 'https://ngfb-sortable-table-demo.firebaseio.com',
  projectId: 'ngfb-sortable-table-demo',
  storageBucket: 'ngfb-sortable-table-demo.appspot.com',
  messagingSenderId: '1061433697273'
});

@NgModule({
  declarations: [
    AppComponent,
    TableItemComponent,
    TableHeaderComponent,
    TableFooterComponent,
    TableContainerComponent
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
    NgFbSortableTableModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TableItemComponent,
    TableHeaderComponent,
    TableFooterComponent
  ]
})
export class AppModule { }
