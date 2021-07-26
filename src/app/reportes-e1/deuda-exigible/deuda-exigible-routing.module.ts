import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeudaExigibleListComponent } from './deuda-exigible-list/deuda-exigible-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: DeudaExigibleListComponent, data: { title: 'Deuda Exigible'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudaExigibleRoutingModule {}
