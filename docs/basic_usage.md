# Basic usage:

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { Pagination, TableFilter, AddNew, PriorityKeysPipe, HeaderItem } from src;

@Component({
  selector: 'tr [table-item]', //it is absolutely obligatory to use such a selector to have proper display of a table.  
  templateUrl: `<td></td><td></td><td></td><td></td><td></td>`,
})
export class FirstTableItemComponent implements OnInit {
  @Input('item') private item: any;
  constructor() { }
}

@Component({
  selector: 'tr [table-item]',
  templateUrl: `<td></td><td></td><td></td><td></td><td></td>`,
})
export class SecondTableItemComponent implements OnInit {
  @Input('item') private item: any;
  constructor() { }
}


@Component({
    selector: 'app-table-container',
    template: `
      <md-sidenav-container>
        <md-sidenav class="sidenav" opened="true" align="start" mode="side"></md-sidenav>
        <ngfb-sortable-table
            [title]="title"
            [databaseDataPath]="toFetch"
            [filterByInputValue]="filterByInputValue"
            [filterBySelect]="filterBySelect"
            [itemComponent]="itemComponent"
            [pagination]="pagination"
            [addNew]="addNew"
            [setHeaders]="setHeaders">
        </ngfb-sortable-table>
      </md-sidenav-container>
    `
})
export class SortableTableContainerComponent {
    toFetch: string = 'dbPath';
    itemComponent: Component;
    pagination: Pagination = {
        defaultOption: 20,
        options: [20, 50, 100]
    };
    filterBySelect: TableFilter | undefined;
    filterByInputValue: string | undefined;
    addNew: AddNew | undefined;
    
    constructor(
        route: ActivatedRoute,
        keysPipe: PriorityKeysPipe
    ) {
        //bind in order to save context while parsing headers
        this.setHeaders = this.setHeaders.bind(this);
        
        route.params.subscribe((params : Params) => {
            //table content update logic
            if (params['someParam'] === 'someValue') {
                this.toFetch = 'someDbPath';
                this.itemComponent = FirstTableItemComponent;
            } else if (params['someParam'] === 'anotherValue') {
                 this.toFetch = 'anotherDbPath';
                 this.itemComponent = SecondTableItemComponent;
            }
        })
    }
    
    setHeaders(data: Observable<{key: string, value : Array<any>}>) : Observable<Array<HeaderItem>> {
        //hook on each databaseDataPath change
        return data.map(({key, value}) => {
            return Object.keys(value).map(key => ({
                name: key,
                sortable: true
            })).concat(
                [{
                   name: 'additional header 1',
                   sortable: false
                }, {
                   name: 'additional header 2',
                   sortable: false
                }]
            )
            
        });                                                           
    }
}
```