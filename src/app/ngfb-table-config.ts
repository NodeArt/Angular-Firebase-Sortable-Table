import { TableConfig } from '../../';
import { TableItemComponent } from './table-item/table-item.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { LoadingComponent } from './loading/loading.component';
import { app } from './firebase.app';

export const tableConfig: TableConfig = {
  paths: {
    employees: {
      itemComponent: TableItemComponent,
      headerComponent: TableHeaderComponent,
      footerComponent: TableFooterComponent,
      loadingComponent: LoadingComponent,
    },
    employers: {
      itemComponent: TableItemComponent,
      loadingComponent: LoadingComponent
    }
  },
  database: app.database()
};
