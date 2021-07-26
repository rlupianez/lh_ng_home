import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TestRoutingModule } from './test-routing.module';
import { FormComponent } from './form/form.component';
import { FragmentScrollerComponent } from './fragment-scroller/fragment-scroller.component';

import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AnimationsComponent } from './animations/animations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { FormCreditCardComponent } from './form-credit-card/form-credit-card.component';


@NgModule({
  declarations: [
    FormComponent, 
    ToolbarComponent, 
    AnimationsComponent,
    FragmentScrollerComponent,
    FormCreditCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    TestRoutingModule,
    RouterModule,
    MatButtonModule,
    SharedModule
  ]
})
export class TestModule { }
