import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportRoutingModule } from './transport-routing.module';
import { SharedModule } from '@shared/shared.module';
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
import { TransportPageComponent } from './transport-page/transport-page.component';
import { TransportLabelComponent } from './transport-label/transport-label.component'
import { ModalSaveTransport } from './modal-save/modal-save.component';
@NgModule({
  declarations: [
    TransportPageComponent,
    TransportLabelComponent,
    ModalSaveTransport
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    TransportRoutingModule,

  ],
  entryComponents: [
  ]
})
export class TransportModule {

}
