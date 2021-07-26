import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  children: [
    { path: 'retenciones', loadChildren: () => import('./retenciones/retenciones.module').then(m => m.RetencionesModule) },
    { path: 'cuenta-corriente', loadChildren: () => import('./cuenta-corriente/cuenta-corriente.module').then(m => m.CuentaCorrienteModule) },
    { path: 'comisiones-fact-pend', loadChildren: () => import('./comisiones-fact-pend/comisiones-fact-pend.module').then(m => m.ComisionesFactPendModule) },
    { path: 'incobrables', loadChildren: () => import('./incobrables/incobrables.module').then(m => m.IncobrablesModule) },
    { path: 'deuda-exigible', loadChildren: () => import('./deuda-exigible/deuda-exigible.module').then(m => m.DeudaExigibleModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesE1RoutingModule { }
