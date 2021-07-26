import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AnimationsComponent } from './animations/animations.component';
import { FragmentScrollerComponent } from './fragment-scroller/fragment-scroller.component';
import { FormCreditCardComponent } from './form-credit-card/form-credit-card.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'form', component: FormComponent },
      { path: 'home-toolbar', component: ToolbarComponent },
      { path: 'animations', component: AnimationsComponent },
      { path: 'fragment-scrolling', component: FragmentScrollerComponent },
      { path: 'credit-card-form', component: FormCreditCardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
