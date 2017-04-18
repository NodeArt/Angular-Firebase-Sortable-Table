import {
    Component, OnChanges, Input, ViewChild, ViewEncapsulation, SimpleChange, SimpleChanges
} from '@angular/core';
import { SortableTableService, SortableEvents } from "../../services/sortable-table.service";
import { HeaderItem, TableFilter, Pagination, FieldToQueryBy, SetHeadersFunction, SearchString, TableItem } from "../../models/sortable-table.model";
import { fadeInAnimation } from "../../../route.animation";
import { Observable } from "rxjs";

declare const require: any;

const debounce = require('lodash.debounce');

@Component({
    selector: 'ngfb-sortable-table',
    templateUrl: './sortable-table.component.html',
    styleUrls: ['./sortable-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": "true"
    },
    animations: [ fadeInAnimation ]
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
    @ViewChild('searchString') public searchString;
    public data: Array<any> = [];
    public headers: Array<HeaderItem>;
    public isLoading: boolean = false;
    public fieldToSortBy: string;
    public isFirstTime: boolean = true;
    constructor(
        public DB: SortableTableService
    ) { }

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
            if (this.filterBySelect) {
                this.fetchData(SortableEvents.FilterBySelect, {
                    value: this.filterBySelect.defaultOption,
                    field: this.filterBySelect.field
                }, true);
            } else {
                this.fetchData();
            }
        }
    }

    public onSearchInputChanged = debounce(function ($event) {
        Observable
            .of($event['srcElement']['value'])
            .map(inputVal => inputVal.replace(/\?!.#$[]/g, ''))
            .first()
            .subscribe(inputVal => {
                this.fetchData(SortableEvents.FilterBySearch, {
                    field: this.filterByInputValue.defaultField,
                    value: inputVal
                }, true);
            })
    }, 500);

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

    public filterBySelectChanged($event) {
        this.paginationChanged(this.pagination.defaultOption);
        this.fetchData(SortableEvents.FilterBySelect, {
            value: $event.value,
            field: this.filterBySelect.field
        }, true)
    }

    public paginationChanged(value) {
        this.pagination.defaultOption = value;
        this.DB.setPagination(value);
    }

    public fetchData(event? : number, fieldToQueryBy?: FieldToQueryBy, cleanUp?: boolean): void {
        this.isLoading = true;
        this.reset(event);

        const requestStream = this.DB
            .get(this.databaseDataPath, event, fieldToQueryBy)
            .share()
            .first();

        requestStream
            .map(({key, value}) => Object.keys(value || {}).map(key => value[key]))
            .do(() => this.isLoading = false)
            .first()   //never lose the link to obj in order to save rendering process
            .subscribe(arr => cleanUp ? this.data.splice(0, this.data.length, ...arr) : this.data.push(...arr));

        if (this.isFirstTime) {
            const mapper = (data: Observable<{key: string, value : Array<any>}>) : Observable<Array<HeaderItem>> =>
                data.map(({key, value}) => {
                    const keys = Object.keys(value);
                    if (keys.length) {
                        const data = value[Object.keys(value)[0]];
                        return Object.keys(data).map(key => ({name : key, sortable: true}))
                    }
                });

            const headers = this.setHeaders ? this.setHeaders(requestStream) : mapper(requestStream);

            headers
                .first()
                .subscribe((data: Array<HeaderItem>) => this.headers = data);
            this.isFirstTime = false;
        }
    }

    public onInfinite(): void {
        console.log('infinite');
        if (this.pagination) {
            this.fetchData(
                SortableEvents.InfiniteScroll,
                null,
                this.DB.lastEventHappened !== undefined
            );
        }
    }

    public trackByFn(index, item): string {
        return item.$key;
    }

    public sortBy(field): void {
        this.fieldToSortBy = this.fieldToSortBy === field ? `-${field}` : field;
        this.paginationChanged(this.pagination.defaultOption);
        console.log('order', this.fieldToSortBy.startsWith('-') ? 'desc' : 'asc');
        this.fetchData(SortableEvents.SortByField, {
            field: field,
            order: this.fieldToSortBy.startsWith('-') ? 'desc' : 'asc'
        }, true);
    }

    public onItemChange(...args): void {
        console.log(args, 'fromTableComponent');
        if (this.onChange) {
            this.onChange.apply(this, args);
        }
    }
}