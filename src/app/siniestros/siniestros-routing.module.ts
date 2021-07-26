import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiniestrosListComponent } from '../siniestros/siniestros-list/siniestros-list.component';
import { SiniestrosDetailComponent } from '../siniestros/siniestros-detail/siniestros-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: SiniestrosListComponent, data: { title: 'Siniestros' } },
      { path: ':siniestro/:cod_sec', component: SiniestrosDetailComponent, data: { title: 'Detalle Siniestros' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestrosRoutingModule { }
