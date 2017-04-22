import { Component, Input, HostBinding } from '@angular/core';

/**
 * Shows loader while data is being fetched
 */

@Component({
    selector: 'ngfb-loading',
    template: `<md-progress-bar mode="indeterminate"></md-progress-bar>`,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @HostBinding('class.show') @Input('isLoading') isLoading: boolean = true;
    constructor() { }
}
