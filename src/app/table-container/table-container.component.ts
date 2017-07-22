import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from '@nodeart/ngfb-sortable-table';
import { tableConfig } from '../ngfb-table-config';

import { Observable } from 'rxjs/Observable';

import 'rxjs/observable/fromEvent';


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

  constructor(public router: Router) { }

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
