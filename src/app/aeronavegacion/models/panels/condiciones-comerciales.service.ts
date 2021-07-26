import { Injectable } from '@angular/core';
import { fields, group, formFields, viewFields } from './condiciones-comerciales';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

import * as moment from 'moment';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { ApiService } from '@core/services/http/api.service';

export type SectionStatusType = 'Emitir' | 'Cotizar';

@Injectable({
  providedIn: 'root'
})
export class CondicionesComercialesService extends CotizadorPanelService {

  codProd: string;
  constructor(
    public formService: FormsFactoryService, 
    public formManager: FormsManagerService,
    public apiService: ApiService) {
    super(formService, formManager, fields, group );
  }

  
  initPanel(editable: boolean){

    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = viewFields;
    }

    this.initializeForms(fields, editable);

  }

  setProductor(codProd){
    this.codProd = codProd;
    this.addRangosComision();
  }

  addRangosComision(){
    const filters = {
      "p_cod_prod": this.codProd ? this.codProd  : '9083'
    }

    this.apiService.post('/cot_aero/TOPES_COMISION', filters, false).subscribe( res => {
      console.log('rangos comision', res);
      if(res && !res['p_error']){

        let config = { ...this.formGroupConfig['children']['porc_comision'] }
        config['control']['config'] = {
          max: res['p_pct_max'] || 30,
          min: res['p_pct_min'] || 2
        }
        
        
        
        this.formGroupConfig['children']['porc_comision'] = config;
      }
    })
  }

  setValue(data){
    //let cc = this.getCondicionesComerciales(data);
    //console.log('condiciones comerciales', cc);
    this.formGroup.patchValue(data);
    this.formGroup.markAllAsTouched();

    this.configVisibility();
    
  }

  configVisibility(){
    const forma_pago = this.formGroup.getRawValue().forma_pago;
    switch(forma_pago){
      case 'P': // cuponera
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu','banco','tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta'], true);
          this.formGroup.markAsTouched();
        break;
      case  'T': // tarjeta
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu'], true);
        break;
      case 'U': // CBU
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta'], true);
        break;
    }
  }

  getCondicionesComerciales(data){

    return {
      moneda: data['cod_mon'] || '',
      desc_moneda: data['x_moneda'] || '',
      forma_pago: data['t_forma_pago'] || '',
      desc_forma_pago: data['x_forma_pago'] || '',
      planes_pago: data['cod_plan'] || '',
      desc_planes_pago: data['x_plan_pagos'] || '',
      cbu: data['cbu'] || '',
      titular_cbu: data['titular_cbu'] || '',
      banco: data['cod_banco'] || '',
      desc_banco: data['x_banco'] || '',
      tipo_tarjeta: data['cod_tipo_tarjeta'] || '',
      desc_tipo_tarjeta: data['x_tipo_tarjeta'] || '',
      nro_tarjeta: data['nro_tarjeta'] || '',
      titular: data['titular'] || '',
      porcentaje_comision: data['pct_comision'] || ''
    }
  }


  initVigenciaLogic(){


    /***************************************+
     *    Vigencia
     *****************************************/

    this.formGroup.get('vigencia').valueChanges.subscribe( (vigencia: string) => {
      if(vigencia){
        // meter en servicio de cotizador aero

        let start = moment().add(1,'days');
        const vigenciaDesde = this.formGroup.get('vigencia_desde').value;
        if(vigenciaDesde && start !== vigenciaDesde){
          start = moment(vigenciaDesde);
        }

        switch(vigencia){
          case 'Anual':
            const anual = moment(start).add(12,'M');
            this.formGroup.get('vigencia_hasta').setValue(anual);
            break;
          case 'Semestral':
            const sem = moment(start).add(6, 'M');
            this.formGroup.get('vigencia_hasta').setValue(sem);
            break;
          case 'Trimestral':
            const tri = moment(start).add(3, 'M');
            this.formGroup.get('vigencia_hasta').setValue(tri);
            break;
        }
        
        this.formGroup.get('vigencia_desde').setValue(start);
        // this.cotizarFormConfig['vigencia_contrato']['children']['vigencia_desde']['hidden'] = false;

        // this.cotizarFormConfig['vigencia_contrato']['children']['vigencia_hasta']['hidden'] = false;
        this.formGroup.get('vigencia_hasta').disable(); 


      }

    });



    /***************************************+
     *    Vigencia Desde
     *****************************************/

    this.formGroup.get('vigencia_desde').valueChanges.subscribe((vigenciaDesde: any) => {
      const vigencia = this.formGroup.get('vigencia').value;

      const today = moment(vigenciaDesde);
      switch (vigencia) {
        case 'Anual':
          const anual = moment(today).add(12, 'M');
          this.formGroup.get('vigencia_hasta').setValue(anual);
          break;
        case 'Semestral':
          const sem = moment(today).add(6, 'M');
          this.formGroup.get('vigencia_hasta').setValue(sem);
          break;
        case 'Trimestral':
          const tri = moment(today).add(3, 'M');
          this.formGroup.get('vigencia_hasta').setValue(tri);
          break;
      }
    });
  }


  getRawData(){
    return this.formGroup.getRawValue();
  }

}
