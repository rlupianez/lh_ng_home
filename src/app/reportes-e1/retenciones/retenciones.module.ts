import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { RetencionesRoutingModule } from './retenciones-routing.module';
import { RetencionesListComponent } from './retenciones-list/retenciones-list.component';
import { SharedModule } from '@shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [RetencionesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    RetencionesRoutingModule
  ]
})
export class RetencionesModule { }
