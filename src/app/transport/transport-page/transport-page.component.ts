import { Component, OnInit } from '@angular/core';
import { WizardStep } from './services/transport-interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransportService } from '../services/transport.service';
import { TrafficTypeEnum } from './services/transport-interfaces';
import { ModalSaveTransport as ModalSaveTransport } from '../modal-save/modal-save.component';

@Component({
  selector: 'app-transport-page',
  templateUrl: './transport-page.component.html',
  styleUrls: ['./transport-page.component.scss']
})
export class TransportPageComponent implements OnInit {
  panelFocus: String;

  trafficTypeValueEnum = TrafficTypeEnum;
  constructor(
    public dialog: MatDialog,
    public transportService: TransportService,
  ) {
    this.panelFocus = WizardStep.productor;
  }

  get WizardStepEnum() {
    return WizardStep
  }

  IsPanel(step) {
    return this.panelFocus !== step;
  }

  initService() {

  }

  ngOnInit() {
    this.initService();
  }


  confirmar() {
    const dialogRef = this.dialog.open(ModalSaveTransport, {
      width: '50%',
      height: '38%',
      data: {
        cotizacionNr: 232,
        polizaNr: 3232,
        endosoNr: 3232,
        polizaLink: 32323
      },
      panelClass: 'cotizacion-dialog'
    });

    dialogRef.afterClosed().subscribe(response => {

      if (response === 'print') { }


      if (response === 'Emitir') { }

      if (!response) { }




    });


  }

}
