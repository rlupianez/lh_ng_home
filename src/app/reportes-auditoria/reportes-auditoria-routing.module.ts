import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lavado-activos', loadChildren: () => import('./lavado-activos/lavado-activos.module').then(m => m.LavadoActivosModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesAuditoriaRoutingModule { }
