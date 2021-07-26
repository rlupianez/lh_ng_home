import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

import * as _moment from 'moment';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { ToasterService } from '@core/services/toaster.service';

import { CotizarService } from './cotizar.service';
import { DatosRiesgoService } from '../models/datos-riesgo.service';
import { CoberturasService } from '../models/coberturas.service';
//import { AeronavegacionService } from '../aeronavegacion.service';



const moment = _moment;


@Component({
  selector: 'app-aerocotizador',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.scss'],
  providers: [ 
    ProgressBarService,
    CotizarService, 
    DatosRiesgoService,
    CoberturasService
   ]
})
export class CotizarComponent implements OnInit, OnDestroy, AfterViewInit {
 
  loading: boolean;
  loaded: boolean = false;
  editable: boolean = true;
  // panels managment -- luego delegar en otro componente o servicio
  activePanelName: string;
  panelsId: any[] = [
    'riesgos',
    'transito-local',
    'importacion',
    'exportacion',
    'coberturas'
    /*
    'tomador',
    'condiciones-comerciales',
    'tipo-riesgo',
    'datos-riesgo',
    'productos',
    'usos',
    'coberturas'
    */
  ]


  constructor(
    public cotizarService: CotizarService,
    private cdref: ChangeDetectorRef,
    private progressService: ProgressBarService,
    private toastService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) { 
     
    
  }

  ngOnInit() {
      this.initService();
  }

  ngAfterViewInit(){
    this.cdref.detectChanges();
  }

  ngOnDestroy(){
    this.loaded = false;
  }

  initService(){
    this.loaded = false;
    this.activePanel('riesgos');
    this.cotizarService.setAllPanelsStatus(this.editable);
    this.loaded = true;
  }

  ////////////////////////////////////////////////////////////////////////////////

  backToDatosRiesgos(backInstance: HTMLElement){
    this.activePanel('riesgos');
    this.scroll(backInstance);
  }

  backPanelRiesgos(){
    let prevPanel;
    if(this.cotizarService.transitoLocalService.show){
      prevPanel = 'transito-local';
    }
    if(this.cotizarService.importacionService.show){
      prevPanel = 'importacion';
    }
    if(this.cotizarService.exportacionService.show){
      prevPanel = 'exportacion';
    }

    this.activePanel(prevPanel);
  }

  nextPanelRiesgos(){
    let nextPanelName;
    if(this.cotizarService.transitoLocalService.show){
      nextPanelName = 'transito-local';
    }
    if(this.cotizarService.importacionService.show){
      nextPanelName = 'importacion';
    }
    if(this.cotizarService.exportacionService.show){
      nextPanelName = 'exportacion';
    }

    this.activePanel(nextPanelName);
    this.passDataToPanel();

  }

  nextPanelCoberturas(nextInstance: HTMLElement){
    this.activePanel('coberturas');
    this.passDataToPanel();
    this.scroll(nextInstance);
  }
  
  /******************************************************************
   * 
   *        PANELS ADMIN
   * 
   ******************************************************************/

  canEditPanel(panelName: string){

    let panelIndex = this.panelsId.indexOf(panelName);
    let activePanelIndex = this.panelsId.indexOf(this.activePanelName);

    if(panelIndex !== -1 && activePanelIndex !== -1){
      return panelIndex < activePanelIndex;
    }
    return false;
  }

  nextPanel(nextInstance: HTMLElement){
    const nextPanel = this.getNextPanelId();
    this.activePanel(nextPanel);
    this.passDataToPanel();
    this.scroll(nextInstance); 
  }

  prevPanel(backInstance: HTMLElement){
    const prevPanel = this.getPrevPanelId();
    this.activePanel(prevPanel);
    this.scroll(backInstance);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }
 
  getNextPanelId(){
    if(this.activePanelName){

      let panelPos = this.panelsId.indexOf(this.activePanelName);
      if(panelPos !== -1){
        let nextPanelPos = panelPos + 1;
        return nextPanelPos < this.panelsId.length ? this.panelsId[nextPanelPos] : this.panelsId[0];
      }

    }

    return null;

  }

  getPrevPanelId(){
    if(this.activePanelName){

      let panelPos = this.panelsId.indexOf(this.activePanelName);
      if(panelPos !== -1){
        let nextPanelPos = panelPos - 1;
        return nextPanelPos < this.panelsId.length ? this.panelsId[nextPanelPos] : this.panelsId[0];
      }

    }

    return null;
  }

  setPanelStatus(name: string, active: boolean){
    switch(name){
      case 'riesgos':
        this.cotizarService.datosRiesgoService.active = active;
        break;
      case 'transito-local':
        this.cotizarService.transitoLocalService.active = active;
        break;
      case 'importacion':
        this.cotizarService.importacionService.active = active;
        break;
      case 'exportacion':
        this.cotizarService.exportacionService.active = active;
        break;
      case 'coberturas':
        
        this.cotizarService.coberturasService.active = active;
        break;
    }
    
  } 

  inactiveAllPanels(){
    
    let active = false;
    
    this.editable = false;
    this.cotizarService.datosRiesgoService.active = active;
    this.cotizarService.transitoLocalService.active = active;
    this.cotizarService.importacionService.active = active;
    this.cotizarService.exportacionService.active = active;
    this.cotizarService.coberturasService.active = active;

  }

  activePanel(name: string){
    
    if(this.panelsId.indexOf(name) !== -1){
      this.setPanelStatus(name, true);
      this.activePanelName = name;
      this.updateAllPanels();
    }

  }

  updateAllPanels(){
    for(let panelName of this.panelsId){

      if(panelName === this.activePanelName){
        this.setPanelStatus(panelName, true);
      }else{
        this.setPanelStatus(panelName, false);
      }
    }
  }

  editPanel(name: string){
    this.activePanel(name);
  }

  passDataToPanel(){

    let currentPanel = this.activePanelName;
    switch(currentPanel){
      case 'coberturas':
        this.passDataToCoberturas();
    }

  }

  ////////////////////////////////////////////////////////////////////////////
  //
  //            Coberturas
  //
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Datos que se deben enviar al panel de coberturas
   */
  passDataToCoberturas(){
    let data =  { 
      ...this.cotizarService.datosRiesgoService.getRawData(),
      ...this.cotizarService.exportacionService.getRawData(),
      ...this.cotizarService.importacionService.getRawData(),
      ...this.cotizarService.transitoLocalService.getRawData(),
    };
   
    this.cotizarService.coberturasService.setSumaAsegurada(this.getSumaAsegurada());
    this.cotizarService.coberturasService.getFiltersData(data);
  }

  /**
   * Obtiene la suma asegurada ingresada segun panel visible
   * 
   */
  getSumaAsegurada(){

    if(this.cotizarService.transitoLocalService.show){
      return this.cotizarService.transitoLocalService.formGroup.value.p_suma_asegurada;
    }
    if(this.cotizarService.importacionService.show){
      return this.cotizarService.importacionService.formGroup.value.p_suma_asegurada;
    }
    if(this.cotizarService.exportacionService.show){
      return this.cotizarService.exportacionService.formGroup.value.p_suma_asegurada;
    }

  }
  

}