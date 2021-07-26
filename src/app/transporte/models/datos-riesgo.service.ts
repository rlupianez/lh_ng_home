import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, Form } from '@angular/forms';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './datos-riesgo';

@Injectable({
  providedIn: 'root'
})
export class DatosRiesgoService extends CotizadorPanelService implements OnDestroy {

 
  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, 
        fields,
        group);

      // aca le pasas los formFields, por ahora no existe view fields.
      
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




