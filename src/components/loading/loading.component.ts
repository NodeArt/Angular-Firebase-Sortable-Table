import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngfb-loading',
    template: `
        <div class="loading" [class.show]="isLoading">
            <md-progress-bar mode="indeterminate"></md-progress-bar>
        </div>
    `,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    @Input('isLoading') isLoading: boolean;
    constructor() { }
}
