import {Component, Input, Output, EventEmitter, HostListener, Directive } from '@angular/core';
import {MdDialogRef, MdDialog, ComponentType, MdDialogConfig} from "@angular/material";

/**
 * Used for opening popups and alert messages
 */

@Directive({
    selector: '[ngfbDialog]'
})
export class DialogDirective {
    @Input() public data: any;
    @Input() public component: Component;
    @Input() public disableClose: boolean = false;
    @Output() public onDialogResult = new EventEmitter<any>();

    constructor(public dialog: MdDialog) { }

    @HostListener("click", ["$event"]) openDialog() {
        const ref: MdDialogRef<Component> = this.dialog.open(
            this.component as ComponentType<Component>,
            {
                disableClose: this.disableClose
            } as MdDialogConfig
        );
        ref.componentInstance['data'] = this.data;
        ref.afterClosed().subscribe(result => this.onDialogResult.emit(result));
    }
}