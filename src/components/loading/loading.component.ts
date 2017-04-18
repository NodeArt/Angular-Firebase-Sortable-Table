import {Component, Input} from '@angular/core';

@Component({
    selector: 'ngfb-loading',
    template: `
        <div class="loading" [class.show]="isLoading">
            <md-progress-bar mode="indeterminate"></md-progress-bar>
        </div>
    `,
    styles: [`
        .loading {
          background-color: rgba(255,255,255, 0.7);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          transition: all .25s ease-in-out;
          opacity: 0;
          visibility: hidden;
        }
        .show {
             opacity: 1;
             visibility: visible;
         }
    `]
})
export class LoadingComponent {
    @Input('isLoading') isLoading: boolean;
    constructor() { }
}
