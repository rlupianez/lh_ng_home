import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizarComponent } from './cotizar/cotizar.component';


const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'cotizar', children: [
                { path: '', component: CotizarComponent, data: { title: 'Cotizador' } },
                { path: ':id', component: CotizarComponent, data: { title: 'Cotizador' } }
            ]
        }
    ]   
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporteRoutingModule { }
