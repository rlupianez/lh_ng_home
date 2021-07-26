import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { ApiService } from '@core/services/http/api.service';
import { map } from 'rxjs/operators';

//////////////////////////////////////////////////////////////////
//
//    Config cabecera y Paneles
//
//////////////////////////////////////////////////////////////////

import * as SeccionesConfig from './siniestros-detail/config/index';


interface ViewConfig {
  cabecera: object;
  paneles: object;
}

@Injectable({
  providedIn: 'root'
})
export class SiniestrosService {

  constructor(private apiService: ApiService) { }

  getSiniestros(query){


    if(query){
      query['p_limite'] = 1000;
      return this.apiService.post('/listados/LISTADO_SINIESTROS', query);
    }

    return of([]);
  }

  getSiniestro(id: string, seccion: string){

    const query = {
      p_cod_sec: seccion,
      p_o_siniestro: id
    }

    if(id && seccion){
      return this.apiService.post('/listados/LISTADO_SINIESTROS', query);
    }

    return of([]);

  }
  getDatosSiniestro(id: string, seccion: string){

    const query = {
      p_cod_sec: seccion,
      p_o_siniestro: id
    }

    if(id && seccion){
      return this.apiService.post('/listados/DATOS_SINIESTROS', query, false);
    }

    return of([]);
  }

  getSubsiniestro(id, seccion){
    const query = {
      p_cod_sec: seccion,
      p_o_siniestro: id
    }

    if(id && seccion){
      return this.apiService.post('/listados/DATOS_DSINIESTRO', query, false);
    }

    return of([]);
  }

  getSiniestrosOrdenesPago(id, seccion){
    
    const query = {
      p_cod_sec: seccion,
      p_o_siniestro: id
    }

    if(id && seccion){
      return this.apiService.post('/listados/LIST_ORD_PAGOS', query, false);
    }

    return of([]);
  }


  /////////////////////////////////////////////////////////////////////////
  //
  //  Funciones para obtener el json con la configuracion de la pantalla
  //  Cabecera y accordiones
  //
  /////////////////////////////////////////////////////////////////////////

  

  getViewConfig(codSec): ViewConfig{

    // Incendio (1), Combinado (2), Cristales (5), RC (8), Robo (9), Rs vs (15), SEguro Tecnico (16)
    if(codSec === '1' || codSec === '2' || codSec === '5' || codSec === '8' || codSec === '9' || codSec === '15' || codSec === '16'){
      return {
        cabecera: SeccionesConfig.IncendioCabeceraSiniestros,
        paneles: SeccionesConfig.IncendioSiniestrosAccordion,
      }
    }

    // Automotores (3) y Motovehículos (13)
    if(codSec === '3' || codSec === '13'){
      return {
        cabecera: SeccionesConfig.AutosCabeceraSiniestros,
        paneles: SeccionesConfig.AutosSiniestrosAccordion
      }
    }

    // Accidentes personales (10) y Plenus (21)
    if(codSec === '10' || codSec === '21'){
      return {
        cabecera: SeccionesConfig.AccidentesPersonalesPlenusCabeceraSiniestros,
        paneles: SeccionesConfig.AccPersonalesPlenusAccordion
      }
    }

    // Aplica para Incendio (1), Combinado (2), Cristales (5), RC (8), Robo (9), Rs vs (15), SEguro Tecnico (16)
    if(codSec === '1' || codSec === '2' || codSec === '5' || codSec === '8' || codSec === '9' || codSec === '15' || codSec === '16'){
      return {
        cabecera: SeccionesConfig.PersonasVidaCabecera,
        paneles: SeccionesConfig.PersonasVidaAccordion
      }
    }

    // Aplicable a las secciones: Cascos (18) y Transportes (19)
    if(codSec === '18' || codSec === '19' ){
      return {
        cabecera: SeccionesConfig.CascosTransportesCabecera,
        paneles: SeccionesConfig.CascosTransportesAccordion
      }
    }

    // Aplicable a las secciones: Aero (14)
    if(codSec === '14'){
      return {
        cabecera: SeccionesConfig.AeroCabecera,
        paneles: SeccionesConfig.AeroAccordion
      }
    }

    // Aplicable a las secciones: Riesgos Agrícolas (07) y Ganado (12)
    if(codSec === '7' || codSec === '12' ){
      return {
        cabecera: SeccionesConfig.AgricolaGanadoCabecera,
        paneles: SeccionesConfig.AgricolasGanadoAccordion
      }
    }

    // Aplicable a las secciones: Caución (11)
    if(codSec === '11'){
      return {
        cabecera: SeccionesConfig.CaucionCabecera,
        paneles: SeccionesConfig.CaucionAccordion
      }
    }

    // si no corresponde a ninguna de esas por ahora devuelve Incendio
    return {
      cabecera: SeccionesConfig.IncendioCabeceraSiniestros,
      paneles: SeccionesConfig.IncendioSiniestrosAccordion
    }


  }
}