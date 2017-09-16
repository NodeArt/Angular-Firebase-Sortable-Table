import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TableConfig } from '../../../';
import { tableConfig } from '../ngfb-table-config';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav;
  @ViewChild('toggler') public toggler;
  public isSidenavOpen = true;
  public tableConfig: TableConfig = tableConfig;
  public sideNavItems: Array<{name: string, toFetch: string}>;
  public path: null;

  constructor(public router: Router, public route: ActivatedRoute) {
    route.params.subscribe((params: Params) => {
      this.path = params['param'];
    });
  }

  ngOnInit() {
    for (let i = 0, l = this.router.config.length; i < l; i++) {
      if (this.router.config[i].path === 'app/:param') {
        this.sideNavItems = this.router.config[i].data['tables'];
      }
    }

  }

  public ngAfterViewInit() {
    Observable
      .fromEvent(this.toggler['_elementRef']['nativeElement'], 'click')
      .subscribe(() => {
        this.sidenav.toggle(!this.isSidenavOpen);
        this.isSidenavOpen = !this.isSidenavOpen;
      })
  }

  public toDocs() {
    window.location.href = 'https://nodeart.github.io/Angular-Firebase-Sortable-Table/modules/NgFbSortableTableModule.html';
  }
}
