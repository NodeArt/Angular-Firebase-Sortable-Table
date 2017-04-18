import { Component } from "@angular/core";
import { Observable } from "rxjs";
export interface HeaderItem {
    name: string;
    sortable: boolean;
}

export type AfterPopupCloseFunction = (items: Array<any>, ...args : Array<any>) => void;

export type SetHeadersFunction = (data : Observable<{key: string, value : Array<any>}>) => Observable<Array<HeaderItem>>;

export interface AddNew {
    component: Component;
    afterPopupClose: AfterPopupCloseFunction;
}

export interface SearchString {
    field: string;
    placeholder?: string;
}

export interface TableFilterOption {
    value: any;
    text: string;
}

export interface TableFilter {
    field: string;
    defaultOption: string | number | boolean;
    resetTo: string | number | boolean;
    placeholder?: string;
    options: Array<TableFilterOption>;
}

export interface Pagination {
    defaultOption: number;
    options: Array<number>;
    placeholder?: string;
}

export interface FieldToQueryBy {
    field: string;
    order?: string;
    value?: string | number | boolean;
}