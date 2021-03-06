import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MdSidenavModule,
    MdButtonModule,
    MdInputModule,
    MdDialogModule,
    MdSelectModule,
    MdIconModule,
    MdCheckboxModule
} from "@angular/material";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFbSortableTableModule } from '@nodeart/ngfb_sortable_table';
import { TableContainerComponent } from './table-container/table-container.component';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { EmployerItemComponent } from './employer-item/employer-item.component';
import { NewPersonComponent } from "./new-person/new-person.component";
import { AlertComponent } from './alert/alert.component';

import { initializeApp } from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbKmIPEGoxk1PEOL4yctQmRpl14DQA9h0",
  authDomain: "ngfb-sortable-table-demo.firebaseapp.com",
  databaseURL: "https://ngfb-sortable-table-demo.firebaseio.com",
  projectId: "ngfb-sortable-table-demo",
  storageBucket: "ngfb-sortable-table-demo.appspot.com",
  messagingSenderId: "1061433697273"
};

initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    TableContainerComponent,
    EmployeeItemComponent,
    EmployerItemComponent,
    NewPersonComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgFbSortableTableModule,
    MdSidenavModule,
    MdDialogModule,
    MdSelectModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  entryComponents: [
    EmployeeItemComponent,
    EmployerItemComponent,
    NewPersonComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
