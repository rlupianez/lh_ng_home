import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { ComisionesFactPendRoutingModule } from './comisiones-fact-pend-routing.module';
import { ComisionesFactPendListComponent } from './comisiones-fact-pend-list/comisiones-fact-pend-list.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    ComisionesFactPendListComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    LhCustomModule,
    ComisionesFactPendRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class ComisionesFactPendModule {}
