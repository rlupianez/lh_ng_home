import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportPageComponent as TransportPageComponent } from './transport-page/transport-page.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TransportPageComponent , data: { title: 'Transporte - Cotizador' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
