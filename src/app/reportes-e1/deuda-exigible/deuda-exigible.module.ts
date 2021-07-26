import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { DeudaExigibleRoutingModule } from './deuda-exigible-routing.module';
import { DeudaExigibleListComponent } from './deuda-exigible-list/deuda-exigible-list.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    DeudaExigibleListComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    LhCustomModule,
    DeudaExigibleRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class DeudaExigibleModule {}
