import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetencionesListComponent } from './retenciones-list/retenciones-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: RetencionesListComponent, data: { title: 'Retenciones'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetencionesRoutingModule { }
