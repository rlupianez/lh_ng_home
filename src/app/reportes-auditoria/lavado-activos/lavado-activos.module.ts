import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { LavadoActivosListComponent } from './lavado-activos-list/lavado-activos-list.component';
import { LavadoActivosRoutingModule } from './lavado-activos-routing.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';
import { LavadoActivosDetailComponent } from './lavado-activos-detail/lavado-activos-detail.component';
import { MatTableModule } from '@angular/material/table';
import { AccordionCustomComponent } from './accordion/accordion-custom.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { DialogConfirmComponent } from './dialogConfirm/dialog-confirm.component';



@NgModule({
  declarations: [
    LavadoActivosListComponent,
    LavadoActivosDetailComponent,
    AccordionCustomComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    LavadoActivosRoutingModule,
    SharedModule,
    LhCustomModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule

  ]
})
export class LavadoActivosModule { }
