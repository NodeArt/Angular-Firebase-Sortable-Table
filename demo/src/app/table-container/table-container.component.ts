import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { Pagination, TableFilter, SearchString, PriorityKeysPipe, HeaderItem } from "@nodeart/ngfb_sortable_table";
import { Observable } from "rxjs";

import { EmployerItemComponent } from "../employer-item/employer-item.component";
import { EmployeeItemComponent } from "../employee-item/employee-item.component";
import { NewPersonComponent } from "../new-person/new-person.component";
import { AlertComponent } from "../alert/alert.component";

import { PeoplePriority, EmployersPriority } from "./enums";

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  providers : [ PriorityKeysPipe ]
})
export class TableContainerComponent {
  private toFetch: string;
  private sideNavItems: Array<{name: string, toFetch: string}>;
  private itemComponent: Component = EmployeeItemComponent;
  private pagination: Pagination = {
    placeholder: 'Upload length',
    defaultOption: 20,
    options: [20, 50, 100]
  };
  private filterBySelect: TableFilter | null;
  private filterByInputValue: SearchString | null;
  private addNew: Component | null;
  private afterPopupClose: Function | null;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private keysPipe: PriorityKeysPipe,
      private dialog: MdDialog
  ) {
    this.setHeaders = this.setHeaders.bind(this);

    for (let i = 0, l = this.router.config.length; i < l; i++) {
      if (this.router.config[i].path === 'app/:param') {
        this.sideNavItems = this.router.config[i].data['tables'];
      }
    }

    route.params.subscribe((params : Params) => {
      this.toFetch = params['param'];
      if (this.toFetch === 'employees') {
        this.itemComponent = EmployeeItemComponent;
        this.filterBySelect = {
          field: 'favoriteFramework',
          defaultOption: null,
          resetTo: null,
          placeholder: 'Filter by yor favorite framework',
          options: [{
            value: null,
            text: "all"
          },{
            value: "AngularJS",
            text: "AngularJS"
          }, {
            value: "Angular2+",
            text: "Angular2+"
          }, {
            value: "React.JS",
            text: "React.JS"
          }, {
            value: "Vue.JS",
            text: "Vue.JS"
          }]
        };
        this.filterByInputValue = {
          defaultField : 'name',
          inputPlaceholder: 'Filter by name (case sensitive)',
          fields: [{
            value: 'name',
            text: 'name'
          }, {
            value: 'cv',
            text: 'cv'
          }]
        };
        this.addNew = NewPersonComponent;
        //called it sortable table context, so used arrow function
        this.afterPopupClose = data => {
          if (data) {
            const config: MdDialogConfig = {
              disableClose: true
            };

            const ref: MdDialogRef<AlertComponent> = this.dialog.open(
                AlertComponent,
                config
            );

            ref.componentInstance['data'] = {
              title: 'Add person',
              msg: `${data['name']} will be added to list`,
              ok: 'Ok',
              err: 'Close'
            };
          }
        };

      } else if (this.toFetch === 'employers') {
        this.itemComponent = EmployerItemComponent;
        this.filterBySelect = null;
        this.filterByInputValue = {
          defaultField : 'name',
          inputPlaceholder: 'Filter by name (case sensitive)',
          fields: [{
            value: 'name',
            text: 'name'
          }, {
            value: 'address',
            text: 'address'
          }, {
            value: 'email',
            text: 'email'
          }]
        };
        this.addNew = null;
        //called it sortable table context, so used arrow function
        this.afterPopupClose = data => {
          const config: MdDialogConfig = {
            disableClose: true
          };

          const ref: MdDialogRef<AlertComponent> = dialog.open(
              AlertComponent,
              config
          );

          ref.componentInstance['data'] = {
            title: 'Remove employer',
            msg: `${data['name']} will be removed from list`,
            ok: 'Ok',
            err: 'Close'
          };
        }
      }
    });
  }

  public toDocs() {
      window.location.href = 'https://nodeart.github.io/Angular-Firebase-Sortable-Table/modules/NgFbSortableTableModule.html';
  }

  public setHeaders (data: Observable<{key: string, value : Array<any>}>) : Observable<Array<HeaderItem>> {
    let priority;
    if (this.toFetch === 'employees') {
      priority = PeoplePriority;
    } else if (this.toFetch === 'employers') {
      priority = EmployersPriority;
    }
    return data.map(({value}): Array<HeaderItem> => {
      const arr = Object.keys(value);
      if (arr.length) {
        const data = Object.assign({}, value[Object.keys(value)[0]]);
        const arr = this.keysPipe
            .transform(data, priority)
            .map((elem) => ({name : elem, sortable: elem !== 'cv'}));

        if (this.toFetch === 'employers') {
          arr.push({name: 'delete', sortable: false});
        }
        arr.unshift({name : 'image', sortable: false});
        return arr;
      }
    })
  }
}