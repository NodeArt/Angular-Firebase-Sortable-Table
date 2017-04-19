import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EmployerItemComponent } from "../employer-item/employer-item.component";
import { PeopleItemComponent } from "../people-item/people-item.component";
import { NewPersonComponent } from "../new-person/new-person.component";
import { Pagination, TableFilter, SearchString, PriorityKeysPipe, HeaderItem } from "@nodeart/ngfb_sortable_table";
import { Observable } from "rxjs";

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
  private itemComponent: Component = PeopleItemComponent;
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
      private keysPipe: PriorityKeysPipe
  ) {

    this.setHeaders = this.setHeaders.bind(this);

    for (let i = 0, l = this.router.config.length; i < l; i++) {
      if (this.router.config[i].path === 'app/:param') {
        this.sideNavItems = this.router.config[i].data['tables'];
      }
    }

    route.params.subscribe((params : Params) => {
      this.toFetch = params['param'];
      if (this.toFetch === 'people') {
        this.itemComponent = PeopleItemComponent;
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
          inputPlaceholder: 'Filter by name',
          fields: [{
            value: 'name',
            text: 'name'
          }, {
            value: 'cv',
            text: 'cv'
          }]
        };
        this.addNew = NewPersonComponent;
        this.afterPopupClose = function () {
          console.log(this);
        };
      } else if (this.toFetch === 'employers') {
        this.itemComponent = EmployerItemComponent;
        this.filterBySelect = null;
        this.filterByInputValue = {
          defaultField : 'name',
          inputPlaceholder: 'Filter by name',
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
        this.afterPopupClose = null;
      }
    });
  }

  setHeaders(obs: Observable<{key: string, value : Array<any>}>) : Observable<Array<HeaderItem>> {
    let priority;
    if (this.toFetch === 'people') {
      priority = PeoplePriority;
    } else if (this.toFetch === 'employers') {
      priority = EmployersPriority;
    }
    return obs.map(({key, value}): Array<HeaderItem> => {
      const arr = Object.keys(value);
      if (arr.length) {
        const data = Object.assign({}, value[Object.keys(value)[0]]);
        const arr = this.keysPipe.transform(data, priority)
            .map((elem) => ({name : elem, sortable: elem !== 'cv'}));
        arr.unshift({name : 'image', sortable: false});
        return arr;
      }
    })
  }

}
