import { EventEmitter } from '@angular/core';

export abstract class TableItem {
    ref: Object;
    index: number;
    emitEvent?: EventEmitter<any>;
}

export abstract class TableHeader {
    headers: Array<any>;
    emitEvent?: EventEmitter<any>;
}

export abstract class TableFooter {
    emitEvent?: EventEmitter<any>;
}
