import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { DatosProductorService, DatosTomadorEmitirService, RiesgosService, CondicionesComercialesService, ProductosService, UsosService, CoberturasService, CondicionesComercialesEmitirService } from '../models/panels/_index';

import * as _moment from 'moment';
import { AeronavegacionService } from '../aeronavegacion.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { ToasterService } from '@core/services/toaster.service';
import { EmitirService } from './emitir.service'
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationService } from '@core/services/navigation.service';


const moment = _moment;


@Component({
  selector: 'app-emitir',
  templateUrl: './emitir.component.html',
  styleUrls: ['./emitir.component.css'],
  animations: [ 
    trigger('fadeIn', animations.SkeletonfadeIn()), 
    animations.slideInTopAnimation],
  providers: [ 
    ProgressBarService,
    EmitirService, 
    AeronavegacionService, 
    DatosProductorService,
    DatosTomadorEmitirService,
    CondicionesComercialesEmitirService,
    RiesgosService,
    ProductosService,
    UsosService,
    CoberturasService,
    CoberturasTableService
   ]
})
export class EmitirComponent implements OnInit, OnDestroy, AfterViewInit {
 
  loading: boolean;
  loaded: boolean = false;
  allData: object;
  // panels managment -- luego delegar en otro componente o servicio
  activePanelName: string;
  panelsId: any[] = [
    //'productor',
    'tomador',
    'condiciones-comerciales',
    //'tipo-riesgo',
    //'datos-riesgo',
    //'productos',
    //'usos',
    //'coberturas'
  ]

  /// Cotizador Service
  nroCotizacion: string = '';
  nroPropuesta: string = '';
  codAsegurado: string = '';
  editable: boolean = false;
  isViewComponent: boolean = null;

  constructor(
    public aeroService: AeronavegacionService,
    public emitirService: EmitirService,
    private cdref: ChangeDetectorRef,
    private progressService: ProgressBarService,
    public dialog: MatDialog,
    public toastService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private navService: NavigationService) { 
       this.loading = true;
  }

  

  ngOnInit() {

    this.route.params.subscribe( params => { 
      
      // Params de url -- id
      if(params.id){
        // si es para generar una nueva propuesta
        const isPropuesta = this.router.url.indexOf('/propuesta/') !== -1;
        // si es solo para visualizar una propuesta ya generada
        this.isViewComponent = this.router.url.indexOf('/propuesta/view') !== -1;

        let emitirParams = {}
        // Parametros para obtener los datos de la propuesta 
        // Puede ser una propuesta
        if(isPropuesta){
          this.editable = false;
          emitirParams = {
            p_o_propuesta: params.id,
            p_tipo_operacion: 'P',
          }
        }else{
          // Es una cotizacion en la que se genera una propuesta por primera vez
          this.editable = true;
          emitirParams = {
            p_o_cotizacion: params.id,
            p_o_propuesta: '',
            p_tipo_operacion: 'C'
          }

        }


        this.progressService.show();
        this.loading = true;
        /**
         * Obtener datos de la propuesta 
         */
        this.emitirService.get(emitirParams).subscribe( res => {
          console.log('get propuesta', res);
          if(res){
            this.nroCotizacion = res['nro_cotizacion'];
            this.nroPropuesta = res['nro_propuesta'];
            this.codAsegurado = res['cod_asegurado'];

            if(this.isViewComponent || res['fec_envio'] || res['cod_estado'] === 'F'){
              this.editable = false;
            }else{
              this.editable = true;
            }
            //this.editable = this.emitirService.canEditForm(this.nroCotizacion, this.nroPropuesta);
            this.initService();
            this.allData = res;
            this.emitirService.setDataInForm(res);
          }  
          this.loading = false;
          this.progressService.hide();
        },
        error => {
          this.loading = false;
          this.editable = false;
          this.progressService.hide();
        })
      }else{
        this.initService();
        this.editable = false;
      }

    },
   );
    
    
  }

  /**
   * 
   * Inicializar los paneles del cotizador (Emitir)
   */
  initService(){
    this.loaded = false;
    this.activePanel('tomador');
    
    this.emitirService.datosProductorService.initPanel(false)
    this.emitirService.datosTomadorEmitirService.initPanel(this.editable);
    this.emitirService.condicionesComercialesEmitirService.initPanel(this.editable);
    this.emitirService.condicionesComercialesEmitirService.setAsegurado(this.codAsegurado || null);
    this.emitirService.riesgosService.initPanel(false);
    this.emitirService.productosService.initPanel(false);
    this.emitirService.coberturasService.editable = false;
    this.emitirService.coberturasService.setStatus('Emitir');
    this.emitirService.usosService.isEditable(false);

    this.loaded = true;
  }

  ngOnDestroy(){
    this.loaded = false;
  }

  ngAfterViewInit(){
    this.cdref.detectChanges();
  }

  /**
   * Pasaje de parametros de un panel a otro
   */
  passDataToPanel(){

    let currentPanel = this.activePanelName;
    switch(currentPanel){
      case 'condiciones-comerciales':
        this.passDataToCondicionesComerciales();
      case 'usos':
        this.passDataToUsosPanel();
        break;
      case 'coberturas':
        this.passDataToCoberturas();
    }

  }

  passDataToCondicionesComerciales(){
    // se le debe enviar el codigo de asegurado al panel de Condiciones Comerciales
    // para que pueda obtener los datos de la tarjeta del asegurado
    this.emitirService.condicionesComercialesEmitirService.setAsegurado(this.codAsegurado);
  }

  passDataToUsosPanel(){
    let data = this.emitirService.productosService.formGroup.getRawValue();
    if(data.producto){
      this.emitirService.usosService.setProducto(data.producto);
    }
  }

  passDataToCoberturas(){
    let data =  { 
      ...this.emitirService.datosProductorService.getRawData(),
      ...this.emitirService.datosTomadorEmitirService.getRawData(),
      ...this.emitirService.condicionesComercialesEmitirService.getRawData(),
      ...this.emitirService.riesgosService.getRawData(),
      ...this.emitirService.productosService.getRawData(),
      ...this.emitirService.usosService.getRawData() 
    };

    this.emitirService.coberturasService.getFiltersData(data);
  }
  
  ///////////////////////////////////////////////////////////////////////////////


  finalizar(){
      this.openCotizarActions();
  }

  openCotizarActions(): void {
    const actions = this._bottomSheet.open(EmitirBottomActions, {
      panelClass: 'c-cotizar-bottom-actions-panel'
    });

    actions.afterDismissed().subscribe((action: 'Volver' | 'Guardar' | 'Finalizar') => {
     
        console.log('accion seleccionada', action);
        switch(action){
          case 'Guardar':
            this.guardarPropuesta();
            break;
          case 'Finalizar':
            this.emitirCotizacion();
            break;
        }

    });
    
  }

  /// Crear cotizacion Service

  getCotizacionData(){

      let cotizacion = { 
        ...this.allData,
        ...this.emitirService.datosProductorService.getRawData(),
        ...this.emitirService.datosTomadorEmitirService.getRawData(),
        ...this.emitirService.condicionesComercialesEmitirService.getRawData(),
        ...this.emitirService.riesgosService.getRawData(),
        ...this.emitirService.productosService.getRawData(),
        ...this.emitirService.usosService.getRawData(),
        ...this.emitirService.coberturasService.getRawData(),
       };

      console.log('cotizacion data', cotizacion)
      return cotizacion;
  }

  emitirCotizacion(){
    let emitirData = this.emitirService.getData();
    console.log('datos propuesta', emitirData);
    emitirData.cod_asegurado = this.codAsegurado;
    emitirData.o_cotizacion = this.nroCotizacion;
    emitirData.o_propuesta = this.nroPropuesta;

    this.setPropuesta(emitirData);
    
  }

  guardarPropuesta(){
    let emitirData = this.emitirService.getData();
    console.log('datos guardar propuesta', emitirData);
    emitirData.cod_asegurado = this.codAsegurado;
    emitirData.o_cotizacion = this.nroCotizacion;
    emitirData.o_propuesta = this.nroPropuesta;

    this.savePropuesta(emitirData);
  }

  setPropuesta(params){
    this.toastService.show('Procesando Propuesta', 'info');
    this.progressService.show();
    // chequear si es emitir, p_emitir = 'S'
    // si es solo guardar p_emitir = 'N'
    this.aeroService.generarPropuesta(params).subscribe(
      res => {
        
        if(res && !res['p_error']){

          const dialogRef = this.dialog.open(GuardarPropuestaDialog, {
            width: '50%',
            height: '38%',
            data: { 
              cotizacionNr: res['p_solicitud'],
              polizaNr: res['p_poliza'],
              endosoNr: res['p_endoso'],
              polizaLink: res['link_impresiones_pol']
            },
            panelClass: 'cotizacion-dialog'
          });

          dialogRef.afterClosed().subscribe( response => { 
            
              if( response === 'link-poliza' ){
                if(res['link_impresiones_pol']){
                  window.open(res['link_impresiones_pol']);
                  //this.router.navigate([`/cotizaciones-propuestas/list`]);
                  this.redirectToCotizacionesPropuesta();
                }
              }

              if( response === 'ver-poliza'){
                if(res['p_poliza']){
                  //this.router.navigate([`/reportes-productores/poliza-cartera/${res['p_poliza']}/14/0/0`]);
                  this.navService.navigateToPage({
                    baseUrl: '/reportes',
                    modulePath: '/reportes-productores',
                    pagePath: `/poliza-cartera/${res['p_poliza']}/14/0/0`
                  });
                }
              }
              
              
              if( response === 'ver-propuesta'){
                if(res['p_solicitud']){
                  //this.router.navigate([`/propuesta/view/${res['p_solicitud']}`]);
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/propuesta/view/${res['p_solicitud']}`
                  });
                }
              }

              if(!response){
                //this.router.navigate([`/cotizaciones-propuestas/list`]);
                this.redirectToCotizacionesPropuesta();
              }
              



          });

        }else{

        }
          this.progressService.hide();
          //this.loading = false;
        
      },
      error => {
        this.toastService.show('Error al guardar. Por favor vuelva a intentar.', 'error');
        this.progressService.hide();
        //this.loading = false;
      }
    )
  }

  savePropuesta(params){

    // chequear si es emitir, p_emitir = 'S'
    // si es solo guardar p_emitir = 'N'
    this.toastService.show('Guardando Propuesta', 'info');
    this.progressService.show();
    this.aeroService.guardarPropuesta(params).subscribe(
      res => {
        
        if(res && !res['p_error']){

          const dialogRef = this.dialog.open(GuardarPropuestaDialog, {
            width: '50%',
            height: '38%',
            data: { 
              cotizacionNr: res['p_solicitud'],
              polizaNr: res['p_poliza'],
              endosoNr: res['p_endoso'],
              polizaLink: res['link_impresiones_pol']
              
            },
            panelClass: 'cotizacion-dialog'
          });

          dialogRef.afterClosed().subscribe( response => { 
            
              //this.router.navigate([`/aeronavegacion/propuesta/${res['p_solicitud']}`]);
              if(!response){
                //this.router.navigate([`/cotizaciones-propuestas/list`]);
                this.redirectToCotizacionesPropuesta();
              }

              if( response === 'ver-propuesta'){
                if(res['p_solicitud']){
                  //this.router.navigate([`/propuesta/view/${res['p_solicitud']}`]);
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/propuesta/view/${res['p_solicitud']}`
                  });
                }
              }
            
          });

        }else{

        }
          this.progressService.hide();
          //this.loading = false;
        
      },
      error => {
        this.toastService.show('Error al guardar. Por favor vuelva a intentar.', 'error');
        this.progressService.hide();
        //this.loading = false;
      }
    )

  }

  /******************************************************************
   * 
   *        PANELS ADMIN
   * 
   ******************************************************************/

   goToFinalizar(footer: HTMLElement){
    this.scroll(footer);
   }

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
      case 'productor':
        this.emitirService.datosProductorService.active = active;
        break;
      case 'tomador':
        this.emitirService.datosTomadorEmitirService.active = active;
        break;
      case 'condiciones-comerciales':
        this.emitirService.condicionesComercialesEmitirService.active = active;
        break;
      case 'tipo-riesgo':
        this.emitirService.riesgosService.tipoRiesgo.active = active;
        break;
      case 'datos-riesgo':
        this.emitirService.riesgosService.datosRiesgo.active = active;
        break;
      case 'productos':
        this.emitirService.productosService.active = active;
        break;
      case 'usos':
        this.emitirService.usosService.active = active;
        break;
      case 'coberturas':
        this.emitirService.coberturasService.active = active;
        break;
    }
  } 

  inactiveAllPanels(){
    
    let active = false;
    //this.editable = false;
    this.emitirService.datosProductorService.active = active;
    this.emitirService.datosTomadorEmitirService.active = active;
    this.emitirService.condicionesComercialesEmitirService.active = active;
    this.emitirService.riesgosService.tipoRiesgo.active = active;
    this.emitirService.riesgosService.datosRiesgo.active = active;
    this.emitirService.productosService.active = active;
    this.emitirService.usosService.active = active;
    this.emitirService.coberturasService.active = active;

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
  
  redirectToCotizacionesPropuesta(){
    this.navService.navigateToPage({
      baseUrl: '/cotizaciones-propuestas',
      modulePath: '/consultas',
      pagePath: `/cotizaciones-propuestas/list`
    });
  }

}

@Component({
  selector: 'guardar-propuesta-dialog',
  templateUrl: 'guardar-propuesta-dialog.component.html'
})

export class GuardarPropuestaDialog {

  cotizacionNr: number;
  polizaNr: number;
  endosoNr: number;
  linkPoliza: string;

  constructor(
    public dialogRef: MatDialogRef<GuardarPropuestaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {

        this.cotizacionNr = data['cotizacionNr'];
        this.polizaNr = data['polizaNr'];
        this.endosoNr = data['endosoNr'];
        this.linkPoliza = data['link_impresiones_pol']
    }

  close(): void {
    this.dialogRef.close(false);
  }

  verPoliza(){
    this.dialogRef.close('ver-poliza');
  }

  imprimirPoliza(){
    this.dialogRef.close('link-poliza');
  }

  verPropuesta(){
    this.dialogRef.close('ver-propuesta');
  }

  
}

@Component({
  selector: 'emitir-bottom-actions',
  templateUrl: 'emitir-bottom-actions.component.html',
})
export class EmitirBottomActions {
  constructor(private _bottomSheetRef: MatBottomSheetRef<EmitirBottomActions>) {}

  openLink(actionName): void {
    this._bottomSheetRef.dismiss(actionName);
    event.preventDefault();
  }
}
