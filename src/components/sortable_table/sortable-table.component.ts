import {
    Component, OnChanges, Input, ViewChild, ViewEncapsulation, SimpleChange, SimpleChanges
} from '@angular/core';
import { DefaultSort, SortableEvents } from '../../models/index';
import { SortableTableService } from "../../services/sortable-table.service";
import { HeaderItem, TableFilter, Pagination, FieldToQueryBy, SetHeadersFunction, SearchString, TableItem } from "../../models/";
import { Observable } from "rxjs";

declare const require: any;

const debounce = require('lodash.debounce');

/**
 * Utility function for handling headers if there is no @Input setHeaders
 * @param data
 */
const mapper = (data: Observable<{key: string, value : Array<any>}>) : Observable<Array<HeaderItem>> =>
  data.map(({value}) => {
      const keys = Object.keys(value);
      if (keys.length) {
          const data = value[Object.keys(value)[0]];
          return Object.keys(data).map(key => ({name : key, sortable: false}))
      }
  });

/**
 * Main component of the module.
 */

@Component({
    selector: 'ngfb-sortable-table',
    templateUrl: './sortable-table.component.html',
    styleUrls: ['./sortable-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SortableTableComponent implements OnChanges {
    @Input() public title: string;
    @Input() public databaseDataPath: string;
    @Input() public setHeaders: SetHeadersFunction;
    @Input() public pagination: Pagination;
    @Input() public filterByInputValue: SearchString;
    @Input() public filterBySelect: TableFilter;
    @Input() public itemComponent: TableItem;
    @Input() public onChange: Function;
    @Input() public addNew: Component;
    @Input() public defaultSort: DefaultSort | null;
    @ViewChild('searchString') public searchString;
    public isLoading: boolean = false;
    public data: Array<any> = [];
    public headers: Array<HeaderItem>;
    public fieldToSortBy: string;
    public isFirstTime: boolean = true;
    constructor(public DB: SortableTableService) { }

    /**
     * Listen to input changes
     * @param changes
     */

    public ngOnChanges(changes: SimpleChanges): void {
        const pathToFetchChangedTo = changes['databaseDataPath'] as SimpleChange;
        if (pathToFetchChangedTo) {
            this.DB.lastEventHappened = undefined;
            if (!pathToFetchChangedTo.isFirstChange()) {
                this.data = [];
                this.fieldToSortBy = '';
            }
            if (this.pagination) {
                this.DB.setPagination(this.pagination.defaultOption || 20);
            }
            this.isFirstTime = true;
            console.log(this.defaultSort);
            if (this.filterBySelect) {
                this.fetchData(SortableEvents.FilterBySelect, {
                    value: this.filterBySelect.defaultOption,
                    field: this.filterBySelect.field
                }, true);
            } else if (this.defaultSort) {
                this.fieldToSortBy = this.defaultSort.config.field;
                this.fetchData(this.defaultSort.event, this.defaultSort.config, true);
            } else {
                this.fetchData();
            }
        }
    }

    /**
     * If there is an @Input filterByInputValue provided
     * this method will be triggered on keyup event.
     * debounce function is much more useful here in comparation with
     * Observable.debounceTime(timer) because input could be created or deleted dinamically.
     */

    public onSearchInputChanged = debounce(function ($event) {
        Observable
          .of($event['target']['value'])
          .map(inputVal => inputVal.replace(/\?!.#$[]/g, ''))
          .first()
          .subscribe(inputVal => {
              this.fetchData(SortableEvents.FilterBySearch, {
                  field: this.filterByInputValue.defaultField,
                  value: inputVal
              }, true);
          })
    }, 500);

    /**
     * Resets view after other than previous event happened
     * @param nextEvent
     */

    public reset(nextEvent): void {
        switch (nextEvent) {
            case SortableEvents.FilterBySearch : {
                this.fieldToSortBy = '';
                if (this.filterBySelect) {
                    this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
                }
                break;
            }
            case SortableEvents.FilterBySelect: {
                this.fieldToSortBy = '';
                if (this.filterByInputValue && this.searchString) {
                    this.searchString['nativeElement'].value = '';
                }
                break;
            }
            case SortableEvents.SortByField : {
                if (this.filterBySelect) {
                    this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
                }
                if (this.filterByInputValue && this.searchString) {
                    this.searchString['nativeElement'].value = '';
                }
                break;
            }
        }
    }

    /**
     * Fetch data when user choose some value in filterBySelect
     * @param $event
     */

    public filterBySelectChanged($event) {
        if (this.pagination) {
            this.paginationChanged(this.pagination.defaultOption);
        }
        this.fetchData(SortableEvents.FilterBySelect, {
            value: $event.value,
            field: this.filterBySelect.field
        }, true)
    }

    /**
     * Change pagination number
     * @param value
     */

    public paginationChanged(value) {
        this.pagination.defaultOption = value;
        this.DB.setPagination(value);
    }

    /**
     * Get data from database and parse it accrdingly.
     * @param event
     * @param fieldToQueryBy
     * @param cleanUp
     */

    public fetchData(event? : number, fieldToQueryBy?: FieldToQueryBy, cleanUp?: boolean): void {
        this.isLoading = true;
        this.reset(event);

        /**
         * This stream whaits for data from db.
         * @type {"../..Observable".Observable<T>|Observable<R|T>}
         */

        const requestStream = this.DB
          .get(this.databaseDataPath, event, fieldToQueryBy)
          .share()
          .first();

        /**
         * This stream puts data to view
         */

        requestStream
          .map(({key, value}) => Object.keys(value || {}).map(key => value[key]))
          .do(() => this.isLoading = false)
          .first()   //never lose the link to obj in order to save rendering process
          .subscribe(arr => cleanUp ? this.data.splice(0, this.data.length, ...arr) : this.data.push(...arr));

        /**
         * Handle headers only once. When path to data in db changes.
         */

        if (this.isFirstTime) {
            const headers = this.setHeaders ? this.setHeaders(requestStream) : mapper(requestStream);

            headers
              .first()
              .subscribe((data: Array<HeaderItem>) => this.headers = data);
            this.isFirstTime = false;
        }
    }

    /**
     * InfiniteScroll event litener
     */

    public onInfinite(): void {
        if (this.pagination) {
            this.fetchData(
              SortableEvents.InfiniteScroll,
              null,
              this.DB.lastEventHappened !== undefined
            );
        }
    }

    /**
     * Function for trackBy in *ngFor directive
     * @param index
     * @param item
     */

    public trackByFn(index, item): string {
        return item.$key;
    }

    /**
     * Sort table by some field
     * @param field
     */

    public sortBy(field): void {
        this.fieldToSortBy = this.fieldToSortBy === field ? `-${field}` : field;
        if (this.pagination) {
            this.paginationChanged(this.pagination.defaultOption);
        }
        this.fetchData(SortableEvents.SortByField, {
            field: field,
            order: this.fieldToSortBy.startsWith('-') ? 'desc' : 'asc'
        }, true);
    }

    /**
     * Emits when addNew component close
     * or when itemChange event happen in TableItemComponent
     * @param result
     */

    public onItemChange(result): void {
        if (this.onChange) {
            this.onChange(result);
        }
    }
}
