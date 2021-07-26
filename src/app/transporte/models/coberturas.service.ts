import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fields, group, fieldsEmitir, groupEmitir } from './coberturas';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { TransporteService } from '../../transporte/transporte.service';
import { CotizadorSectionService } from '@core/services/components/cotizador-section.services';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';

@Injectable({
  providedIn: 'root'
})
export class CoberturasService extends CotizadorSectionService {

  sumaAsegurada: string;

  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private transporteService: TransporteService,
    private coberturasTableService: CoberturasTableService) {
      super(formService, formManager, {
        Cotizar: {
          fields: { ...fields },
          group: { ...group }
        },
        Emitir: {
          fields: { ...fieldsEmitir },
          group: { ...groupEmitir }
        }
      }, 'Cotizar');
  }
  

  initializeForms(){
   
    super.initializeForms();
    if(this.formGroupConfig){
      this.formGroupConfig['children']['cobertura']['control']['editable'] = this.editable;
    }
    
  }

  initGroup(){
  }

  setTableData(items){
    /*const coberturasConfig = { ...this.formGroupConfig['children']['cobertura']['control'],
        editable: false,
        defaultData: items
      }

      this.formGroupConfig['children']['cobertura']['control'] = coberturasConfig; 

      this.initializeForms();
      */
     this.coberturasTableService.setCoberturas(this.parseCoberturaData(items));
  }

  setSumaAsegurada(value){
    this.sumaAsegurada = value;
    this.transporteService.setSumaAsegurada(value); 
  }

  parseCoberturaData(items){
    let data = [];

    for( let cob of items){
      let item = {
        selected: true,
        required: true,
        ...cob
      }

      data.push(item);
    }

    return data;
  }

  getRawData(){
    return this.formGroup.getRawValue();
  }


  getFiltersData(data: object){
    this.setFilters(data);
  }

  setFilters(data: object){

      let primaFilters = {
        p_producto: "1",
        p_cod_mercaderia: 1,
        p_tipo_mercaderia: "U",
        p_suma_asegurada: this.sumaAsegurada,
        p_via: 53
      }
     
      
      this.transporteService.getAllCoberturasPrima(primaFilters);

  }

}
