import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'ngfb-loading',
    template: `<md-progress-bar mode="indeterminate"></md-progress-bar>`,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @HostBinding('class.show') @Input('isLoading') isLoading: boolean = true;
    constructor() { }
}
