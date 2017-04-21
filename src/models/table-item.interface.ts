import { EventEmitter } from "@angular/core";

export abstract class TableItem {
    item: Object;
    index: number;
    onItemChange?: EventEmitter<any>;
}
