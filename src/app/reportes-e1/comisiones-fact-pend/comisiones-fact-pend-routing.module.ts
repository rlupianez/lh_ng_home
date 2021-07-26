import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionesFactPendListComponent } from './comisiones-fact-pend-list/comisiones-fact-pend-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ComisionesFactPendListComponent, data: { title: 'Comisiones Facturadas y/o Pendientes'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionesFactPendRoutingModule {}
