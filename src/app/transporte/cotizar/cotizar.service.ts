import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { DatosRiesgoService } from '../models/datos-riesgo.service';
import { ApiService } from '@core/services/http/api.service';
import { retry, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransitoLocalService } from '../models/transito-local.service';
import { ImportacionService } from '../models/importacion.service';
import { ExportacionService } from '../models/exportacion.service';
import { CoberturasService } from '../models/coberturas.service';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CotizarService implements OnDestroy {

  serviceData: object;
  editable: boolean;

  constructor(
    public datosRiesgoService: DatosRiesgoService,
    public transitoLocalService: TransitoLocalService,
    public importacionService: ImportacionService,
    public exportacionService: ExportacionService,
    public coberturasService: CoberturasService,
    public apiService: ApiService
  ) { 
    //this.addDatosRiesgosLogic();
    //this.addImportacionLogic();
    //this.addExportacionLogic();
  }

  ngOnDestroy(){
    console.log('service cotizar destroy')
  }


  addDatosRiesgosLogic(){

    // agregar observer sobre el campo.
    this.datosRiesgoService.formGroup.get('p_tipo_transito').valueChanges.subscribe( tipo => {
      
      switch(tipo){
        case '3':  // 'A' ----- 'Transito Local' },
          this.transitoLocalService.show = true;
          this.importacionService.show = false;
          this.exportacionService.show = false;
          break;
        case '2':  // 'B' ----- 'Importacion' },
          this.transitoLocalService.show = false;
          this.importacionService.show = true;
          this.exportacionService.show = false;
          break;
        case '1':  // 'C' ----- 'Exportacion' },
          this.transitoLocalService.show = false;
          this.importacionService.show = false;
          this.exportacionService.show = true;
          break;
      }
     
      if (tipo =='T'){
        this.datosRiesgoService.formGroupConfig['children']['p_certificado_eximicion']['hidden'] = false;
        this.datosRiesgoService.formGroup.get('p_certificado_eximicion').enable();
      }
      else{
        this.datosRiesgoService.formGroupConfig['children']['p_certificado_eximicion']['hidden'] = true;
        this.datosRiesgoService.formGroup.get('p_certificado_eximicion').disable();
      }
    

    });

    this.datosRiesgoService.formGroup.get('p_via').valueChanges.subscribe( tipo => {
      
     
      if (tipo =='66'){
        this.datosRiesgoService.formGroupConfig['children']['p_via_terrestre']['hidden'] = false;
        this.datosRiesgoService.formGroup.get('p_via_terrestre').enable();
      }
      else{
        this.datosRiesgoService.formGroupConfig['children']['p_via_terrestre']['hidden'] = true;
        this.datosRiesgoService.formGroup.get('p_via_terrestre').disable();
      }
    

    });







  }
  addImportacionLogic(){

    let sumaExtra =this.importacionService.formGroup.get('p_suma_extra');

    let beneficioImaginario=this.importacionService.formGroup.get('p_benef_imaginario');

    let valorFactura=this.importacionService.formGroup.get('p_valor_factura');

    let sumaAsegurada=this.importacionService.formGroup.get('p_suma_asegurada');

    let sumador=0.00;
    // agregar observer sobre el campo.
    sumaExtra.valueChanges.subscribe( tipo => {
        if(valorFactura.value && sumaExtra.value){
          sumaAsegurada.setValue((parseFloat(valorFactura.value) *tipo)/100+parseFloat(valorFactura.value));
        }
    
    });
    beneficioImaginario.valueChanges.subscribe( tipo => {
      if(valorFactura.value && beneficioImaginario.value){
        sumaAsegurada.setValue((parseFloat(valorFactura.value) *tipo)/100+parseFloat(valorFactura.value));
      }  
    });
    
    valorFactura.valueChanges.subscribe( tipo => {
      if(valorFactura.value && beneficioImaginario.value){
       sumaAsegurada.setValue((parseFloat(valorFactura.value) *beneficioImaginario.value)/100+parseFloat(valorFactura.value));
      }  
      if(valorFactura.value && sumaExtra.value){
        sumaAsegurada.setValue((parseFloat(valorFactura.value) *sumaExtra.value)/100+parseFloat(valorFactura.value));
      }  
    });


  }
  addExportacionLogic(){

    let cartaCredito=this.exportacionService.formGroup.get('p_carta_credito');

    let valorFactura=this.exportacionService.formGroup.get('p_valor_factura');

    let sumaAsegurada=this.exportacionService.formGroup.get('p_suma_asegurada');

   
    // agregar observer sobre el campo.
     cartaCredito.valueChanges.subscribe( tipo => {
      if(valorFactura.value && cartaCredito.value){
        sumaAsegurada.setValue((parseFloat(valorFactura.value) *tipo)/100+parseFloat(valorFactura.value));
      }  
    });    
    valorFactura.valueChanges.subscribe( tipo => {
      if(valorFactura.value && cartaCredito.value){
       sumaAsegurada.setValue((parseFloat(valorFactura.value) *cartaCredito.value)/100+parseFloat(valorFactura.value));
      }  
     
    });


  }

  ////////////////////////////////////////////////////////////////////
  //
  //        Coberturas       
  //
  ////////////////////////////////////////////////////////////////////

  setAllPanelsStatus(editable: boolean){
    this.editable = editable
    this.datosRiesgoService.initPanel(editable);
    this.exportacionService.initPanel(editable);
    this.importacionService.initPanel(editable);
    this.transitoLocalService.initPanel(editable);
    this.coberturasService.editable = this.editable;
    this.coberturasService.setStatus('Cotizar');
    this.addDatosRiesgosLogic();
    this.addImportacionLogic();
    this.addExportacionLogic();
  }
}
