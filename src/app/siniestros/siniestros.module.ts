import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { SiniestrosListComponent } from './siniestros-list/siniestros-list.component';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { SiniestrosDetailComponent } from './siniestros-detail/siniestros-detail.component';
import { SiniestrosHeaderComponent } from './siniestros-detail/siniestros-header/siniestros-header.component';

@NgModule({
  declarations: [SiniestrosListComponent, SiniestrosDetailComponent, SiniestrosHeaderComponent], 
  imports: [
    CommonModule,
    SiniestrosRoutingModule, 
    SharedModule,
    LhCustomModule,
    SiniestrosRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [    
    ImpresionesViewComponent
  ]
})
export class SiniestrosModule { 
  
}
