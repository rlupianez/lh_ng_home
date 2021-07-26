import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiniestrosService } from '../siniestros.service';
import { Location } from '@angular/common';

import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';


@Component({
  selector: 'app-siniestros-detail',
  templateUrl: './siniestros-detail.component.html',
  styleUrls: ['./siniestros-detail.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn()) ]
})
export class SiniestrosDetailComponent implements OnInit {

  tables: object = {};
  // config
  // Cabecera
  siniestrosId: string;
  siniestrosCabecera: object;
  siniestrosAccordion: object;
  dataCabecera: object;
  // ui
  initialLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private siniestrosService: SiniestrosService) { }

  ngOnInit(): void {
    // obtiene los parametros de la url
    this.route.paramMap.subscribe(params => { 
      if(params){
        this.loadData(params);
      }
    });
  }

  /**
   * Obtiene toda la informacion de los servicios y los agrega a los accordiones
   * @param params : parametros obtenidos de la url, siniestro, cod_sec
   * 
   */
  loadData(params){
    // obtener datos del siniestro
    this.initialLoading = true;

    // Obtiene los json de la cabecera y de los paneles (accordiones) segun el codigo de seccion
    const viewConfig = this.siniestrosService.getViewConfig(params.get('cod_sec'));
    this.siniestrosId = params.get('siniestro');
    this.siniestrosCabecera = viewConfig.cabecera;
    this.siniestrosAccordion = viewConfig.paneles;

    /////////////////////////////////////////////////
    // Siniestros
    ////////////////////////////////////////////////
    this.siniestrosService.getSiniestro(params.get('siniestro'), params.get('cod_sec')).subscribe( data => {
      if(data && data['result'] ){
        this.dataCabecera = data['result'][0];
      }
      this.initialLoading = false;
    },
    error => {
      this.initialLoading = false;
    });


    /////////////////////////////////////////////////
    // Datos Siniestros
    ////////////////////////////////////////////////
    this.siniestrosService.getDatosSiniestro(params.get('siniestro'), params.get('cod_sec')).subscribe( data => {
      if(data && data['p_datos_siniestros'] ){
        this.dataCabecera = data['p_datos_siniestros'][0];
        // Agrego info al tab de Datos Basicos
        this.addDatosBasicos(data['p_datos_siniestros']);
      }
      this.initialLoading = false;
    },
    error => {
      this.initialLoading = false;
    });


    /////////////////////////////////////////////////
    // SubSiniestros
    ////////////////////////////////////////////////
    this.siniestrosService.getSubsiniestro(params.get('siniestro'), params.get('cod_sec')).subscribe( data => {
      if(data && data['p_datos_dsiniestro'] ){
        this.addSubsiniestroS(data['p_datos_dsiniestro']);
        /*
        *
        * Estos datos son solo para que se muestren los formularios solo maquetar
        *
        */
        this.addDataMaquetados(data['p_datos_dsiniestro']);
        
      }
    },
    error =>{

    });

    /////////////////////////////////////////////////
    // Ordenes de Pago Siniestro
    ////////////////////////////////////////////////
    this.siniestrosService.getSiniestrosOrdenesPago(params.get('siniestro'), params.get('cod_sec')).subscribe( data => {
      //console.log('ordenes de pago', data);
      if(data && data['p_list_ord_pagos'] && data['p_list_ord_pagos'].length > 0 ){
        this.addOrdenesPago(data['p_list_ord_pagos']);
      }
    },
    error =>{

    });

  }



  addDataMaquetados(data){
    const sections = ['inspecciones', 'reclamo_terceros','liquilador'];

    for(let section of sections){
      this.addDataToAccordion(section, data);
    }
  }

  backRoute(){

    this.location.back();
  }

  /**
   * 
   * Agrega los datos de Datos Basicos al json config.
   * Es un array dependiendo si tiene un solo dato debe mostrar un form.
   * Si son muchos mostrara una tabla
   * @param data 
   */
  addDatosBasicos(data: object[]){
    this.addDataToAccordion('datos_basicos', data);
  }

  addSubsiniestroS(data: object[]){
    this.addDataToAccordion('subsiniestros', data);
  }

  addOrdenesPago(data: object[]){
    this.addDataToAccordion('pagos', data);
  }

  addDataToAccordion(section: string, data: object[]){

    // agrega los datos si existe el panel
    if(this.siniestrosAccordion['expansion_form'].panels[section]){
      this.siniestrosAccordion['expansion_form'].panels[section].content[section].list['control'].defaultData = data;
    this.siniestrosAccordion['expansion_form'].panels[section].disabled = false;
    }
    
  }

  //////////////////////////////////////////////////////////
  //
  //        Eventos
  //
  //////////////////////////////////////////////////////////

  
}


