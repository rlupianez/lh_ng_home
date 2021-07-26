import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, Form } from '@angular/forms';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './exportacion';

@Injectable({
  providedIn: 'root'
})
export class ExportacionService extends CotizadorPanelService implements OnDestroy {

  show: boolean = false;
 
  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, fields, group);

  }

  ngOnDestroy(){

  }

  initializeForms(fields,editable){
    super.initializeForms(fields,editable);
    if(editable){
      //this.initGroupCotizar();
    }
    
  }

  initPanel(editable: boolean){
    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = formFields;
    }

    this.initializeForms(fields, editable);
  }






}




