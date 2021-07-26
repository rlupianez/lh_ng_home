import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { CuentaCorrienteRoutingModule } from './cuenta-corriente-routing.module';
import { CuentaCorrienteListComponent } from './cuenta-corriente-list/cuenta-corriente-list.component';


import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    CuentaCorrienteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    CuentaCorrienteRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class CuentaCorrienteModule { }
