import { Component } from '@angular/core';

/**
 * Shows loader while data is being fetched
 */

@Component({
    selector: 'loading',
    template: `<md-progress-bar mode="indeterminate"></md-progress-bar>`,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent { }
