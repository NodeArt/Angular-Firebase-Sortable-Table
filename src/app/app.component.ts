import { Component } from '@angular/core';
import { TableConfig } from '@nodeart/ngfb-sortable-table';
import { tableConfig } from './ngfb-table-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tableConfig: TableConfig = tableConfig;
}
