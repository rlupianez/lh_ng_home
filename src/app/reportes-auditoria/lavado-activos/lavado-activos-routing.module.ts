import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LavadoActivosListComponent } from './lavado-activos-list/lavado-activos-list.component';
import { LavadoActivosDetailComponent } from './lavado-activos-detail/lavado-activos-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: LavadoActivosListComponent, data: { title: 'Lavado de Activos' } },
      { path: ':id', component: LavadoActivosDetailComponent, data: { title: 'Detalle de Lavado de Activos de Asegurado'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LavadoActivosRoutingModule {}
