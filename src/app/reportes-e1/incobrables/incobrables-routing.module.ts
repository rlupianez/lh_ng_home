import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncobrablesListComponent } from './incobrables-list/incobrables-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: IncobrablesListComponent, data: { title: 'Incobrables' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncobrablesRoutingModule { }
