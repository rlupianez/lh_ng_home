import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AeronavegacionRoutingModule } from './aeronavegacion-routing.module';
import { CotizarComponent, EstadoCotizadorDialog, GuardarCotizacionDialog, CotizarBottomActions } from './cotizar/cotizar.component';
import { EmitirComponent, GuardarPropuestaDialog, EmitirBottomActions } from './emitir/emitir.component';


import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CotizarComponent,
    EmitirComponent,
    GuardarPropuestaDialog,
    GuardarCotizacionDialog,
    EstadoCotizadorDialog,
    CotizarBottomActions,
    EmitirBottomActions
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatBottomSheetModule,
    SharedModule,
    AeronavegacionRoutingModule
  ]
})
export class AeronavegacionModule { }
