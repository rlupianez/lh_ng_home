import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { IncobrablesRoutingModule } from './incobrables-routing.module';
import { IncobrablesListComponent } from './incobrables-list/incobrables-list.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    IncobrablesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    IncobrablesRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class IncobrablesModule { }
