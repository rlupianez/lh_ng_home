import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaCorrienteListComponent } from './cuenta-corriente-list/cuenta-corriente-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: CuentaCorrienteListComponent, data: { title: 'Cuenta Corriente' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaCorrienteRoutingModule { }
