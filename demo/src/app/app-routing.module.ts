import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableContainerComponent } from "./table-container/table-container.component";

const routes: Routes = [
  {
    path: 'app/:param',
    component: TableContainerComponent,
    data: {
      tables: [
        {
          name: 'Employees List',
          toFetch: 'employees'
        },
        {
          name: 'Employers List',
          toFetch: 'employers'
        }
      ]
    }
  }, {
    path: '**',
    redirectTo: 'app/employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
