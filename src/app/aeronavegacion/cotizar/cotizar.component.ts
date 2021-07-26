import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

import * as _moment from 'moment';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { ToasterService } from '@core/services/toaster.service';

import { CotizarService } from './cotizar.service';
import { AeronavegacionService } from '../aeronavegacion.service';
import { DatosProductorService, DatosTomadorService, RiesgosService, CondicionesComercialesService, ProductosService, UsosService, CoberturasService } from '../models/panels/_index';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { NavigationService } from '@core/services/navigation.service';



const moment = _moment;


@Component({
  selector: 'app-aerocotizador',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.scss'],
  providers: [ 
    ProgressBarService,
    CotizarService, 
    AeronavegacionService, 
    DatosProductorService,
    DatosTomadorService,
    CondicionesComercialesService,
    RiesgosService,
    ProductosService,
    UsosService,
    CoberturasService,
    CoberturasTableService
   ]
})
export class CotizarComponent implements OnInit, OnDestroy, AfterViewInit {
 
  loading: boolean;
  loaded: boolean = false;
  // panels managment -- luego delegar en otro componente o servicio
  activePanelName: string;
  panelsId: any[] = [
    'productor',
    'tomador',
    'condiciones-comerciales',
    'tipo-riesgo',
    'datos-riesgo',
    'productos',
    'usos',
    'coberturas'
  ]
  showUsePanel: boolean =  false;
  /// Cotizador Service
  nroCotizacion: string;
  nroPropuesta: string;
  codAsegurado: string;
  editable: boolean = false;
  isCopyComponent: boolean = null;
  isNewCotizacion: boolean = true;
  cotizacionEmitida: boolean = false;

  constructor(
    public navService: NavigationService,
    public aeroService: AeronavegacionService,
    public cotizarService: CotizarService,
    private cdref: ChangeDetectorRef,
    private progressService: ProgressBarService,
    private toastService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fileDownloader: FileDownloaderService,
    private _bottomSheet: MatBottomSheet) { 
     
    
  }

  ngOnInit() {
    
    // Observer a parametros de url
    this.route.params.subscribe( params => { 
      // console.log('params emitir', params);
      if(params.id){
        this.editable = false;
        this.progressService.show();
        this.loading = true;
        this.isNewCotizacion = false;
        // Verificar si es un copia de una cotizacion ya existenten
        this.isCopyComponent = this.router.url.indexOf('/cotizar/copy') !== -1;
        if(this.isCopyComponent){
          this.editable = true;
        }


        // Obtiene los datos de la cotizacion segun id
        this.cotizarService.get(params.id).subscribe( res => {
          console.log('get cotizacion response = ', res);
          if(res){

            this.nroCotizacion = res['nro_cotizacion'];
            this.nroPropuesta = res['nro_propuesta'];
            this.codAsegurado = res['cod_asegurado'];
            
            this.cotizarService.setCotizacionData(res);
            //}
            
            this.initService();
            this.cotizarService.setDataInForm(res);
            //}


          }

          this.loading = false;
          this.progressService.hide();
        },
        error => {
          this.loading = false;
          this.progressService.hide();
        })

      }else{
        this.editable = true;
        this.initService();
      }
      

    },
   );


    this.cotizarService.productosService.formGroup.controls['cod_producto'].valueChanges
    .subscribe( () =>{
      this.showUsePanel = true;
      this.passDataToUsosPanel();

    })
    this.cotizarService.usosService.formGroup.controls['usos'].valueChanges
    .subscribe( () =>{
      this.passDataToCoberturas();
    })

  }

  ngAfterViewInit(){
    this.cdref.detectChanges();
  }

  ngOnDestroy(){
    this.loaded = false;
  }

  initService(){
    this.loaded = false;
    this.cotizarService.setAllPanelsStatus(this.editable);
    this.loaded = true;
  }

  ////////////////////////////////////////////////////////////////////////////////

  

  passDataToPanel(){

    let currentPanel = this.activePanelName;
    switch(currentPanel){

      case 'tomador':
        this.passDataToTomador();
        this.passDataToCondicionesComerciales();
        break;
      case 'productos':

        break;
      case 'usos':
        this.passDataToUsosPanel();
        break;
      case 'coberturas':
        this.passDataToCoberturas();
    }

  }

  passDataToTomador(){
    let data = this.cotizarService.datosProductorService.formGroup.getRawValue();
    if(data.cod_productor && data.cod_productor.codpas){
      this.cotizarService.datosTomadorService.setProductor(data);
    }
  }

  passDataToCondicionesComerciales(){
    let data = this.cotizarService.datosProductorService.formGroup.getRawValue();
    if(data.cod_productor && data.cod_productor.codpas){
      this.cotizarService.condicionesComercialesService.setProductor(data.cod_productor.codpas);
    }
  }

  passDataToUsosPanel(){
    let data = this.cotizarService.productosService.formGroup.getRawValue();
    if(data.cod_producto){
      this.cotizarService.usosService.setProducto(data.cod_producto);
      this.cotizarService.usosService.enableGroup();
    }
  }

  passDataToCoberturas(){
    let data =  { ...this.cotizarService.datosProductorService.getRawData(),
      ...this.cotizarService.datosTomadorService.getRawData(),
      ...this.cotizarService.condicionesComercialesService.getRawData(),
      ...this.cotizarService.riesgosService.getRawData(),
      ...this.cotizarService.productosService.getRawData(),
      ...this.cotizarService.usosService.getRawData() };


    this.cotizarService.coberturasService.getFiltersData(data);
  }


  
  saveCotizacion(){
    return this.aeroService.saveCotizacion(this.getCotizacionData());
    
  }

  finalizar(){
    debugger;
    if(this.cotizarService.valid){
      this.openCotizarActions();
    }
  }

  openCotizarActions(): void {
    const actions = this._bottomSheet.open(CotizarBottomActions, {
      panelClass: 'c-cotizar-bottom-actions-panel'
    });

    actions.afterDismissed().subscribe((action: 'Volver' | 'Guardar' | 'Finalizar') => {
     
        console.log('accion seleccionada', action);
        switch(action){
          case 'Guardar':
            this.guardar();
            break;
          case 'Finalizar':
            this.continuarEmitir(null);
            break;
        }

    });

    
    
  }

  guardar(){
    this.progressService.show();
    this.loading = true;
    this.saveCotizacion().subscribe( res => {

      this.progressService.hide();
      this.loading = false;

      if(res){

        this.nroCotizacion = res['p_o_cotizacion_n'];

        if(this.nroCotizacion){
          this.cotizacionEmitida = true;
        }

        const dialogRef = this.dialog.open(GuardarCotizacionDialog, {
          width: '45%',
          height: '30%',
          data: { cotizacionNr: res['p_o_cotizacion_n'] },
          panelClass: 'cotizacion-dialog'
        });
  
        dialogRef.afterClosed().subscribe( emitir => { 
          if(emitir === true){
            this.navService.navigateToPage({
              baseUrl: '/cotizaciones-propuestas',
              modulePath: '/aeronavegacion',
              pagePath: `/emitir/${this.nroCotizacion}`
            });

            //this.router.navigate([`/emitir/${this.nroCotizacion}`]);
          }
          
          if(emitir === 'imprimir-cotizacion'){
            // this.fileDownloader.downloadEmptyPDF(`Cotizacion#${this.nroCotizacion}`);
            if(res['p_link_pdf_cotizacion']){
              window.open(res['p_link_pdf_cotizacion'], '_blank');
            }
            
          }
          
          if(!emitir){
            // si no da emitir 
            //this.cotizarService.setAllPanelsStatus(false);
            //this.router.navigate([`/cotizaciones-propuestas/list`]);
            this.redirectToCotizacionesPropuesta();
          }
          
        
        });

      }else{
        this.toastService.show('Error al guardar. Por favor vuelva a intentar.', 'error');
      }
     
     
    }, 
    error => {
      this.progressService.hide();
      this.loading = false;
    });
   
  }


  continuarEmitir(event){
    
      this.toastService.show('Procesando Cotización', 'info');
      this.progressService.show();
      this.loading = true;
    
      let codAsegurado = this.cotizarService.datosTomadorService.codAsegurado;
      if(codAsegurado){
       this.aeroService.getDatosTomador(codAsegurado).subscribe( asegurado => {
          //console.log('asegurado', asegurado);         
  
          this.saveCotizacion().subscribe( res => {

            console.log('respuesta GUARDAR_COTIZACION', res);
            //console.log('Codigo Asegurado', codAsegurado);

            this.progressService.hide();
            this.loading = false;

            if(res){

              this.nroCotizacion = res['p_o_cotizacion_n'];

              if(this.nroCotizacion){
                this.cotizacionEmitida = true;
              }

              const dialogRef = this.dialog.open(GuardarCotizacionDialog, {
                width: '45%',
                height: '30%',
                data: { cotizacionNr: res['p_o_cotizacion_n'] },
                panelClass: 'cotizacion-dialog'
              });
        
              dialogRef.afterClosed().subscribe( emitir => {
    
                if(emitir === true){
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/emitir/${this.nroCotizacion}`
                  });
      
                }
                
                if(emitir === 'imprimir-cotizacion'){
                  if(res['p_link_pdf_cotizacion']){
                    window.open(res['p_link_pdf_cotizacion'], '_blank');
                  }
                  this.redirectToCotizacionesPropuesta();
                }
                
                if(!emitir){
                  this.redirectToCotizacionesPropuesta();
                }
              });
            }
           
           
          }, 
          error => {
            this.toastService.show('Error al guardar. Por favor vuelva a intentar.', 'error');
            this.progressService.hide();
            this.loading = false;
          });;
  
        });
          
      }
    
  }


  /// Crear cotizacion Service

  getCotizacionData(){

      let cotizacion = { 
        ...this.cotizarService.datosProductorService.getRawData(),
        ...this.cotizarService.datosTomadorService.getRawData(),
        ...this.cotizarService.condicionesComercialesService.getRawData(),
        ...this.cotizarService.riesgosService.getRawData(),
        ...this.cotizarService.productosService.getRawData(),
        ...this.cotizarService.usosService.getRawData(),
        ...this.cotizarService.coberturasService.getRawData(),
       };

      console.log('cotizacion data', cotizacion)
      return cotizacion;
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
  selector: 'guardar-cotizacion-dialog',
  templateUrl: 'guardar-cotizacion-dialog.component.html'
})
export class GuardarCotizacionDialog {

  cotizacionNr: number;

  constructor(
    public dialogRef: MatDialogRef<GuardarCotizacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {

        this.cotizacionNr = data['cotizacionNr']

    }

  close(): void {
    this.dialogRef.close(false);
  }

  goEmitir(){
    this.dialogRef.close(true);
  }


  imprimirCotizacion(){
    this.dialogRef.close('imprimir-cotizacion');
  }

}


@Component({
  selector: 'estado-cotizador-dialog',
  templateUrl: 'estado-cotizador-dialog.component.html'
})
export class EstadoCotizadorDialog {

  constructor(
    public dialogRef: MatDialogRef<EstadoCotizadorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  close(): void {
    this.dialogRef.close();
  }


  
}



@Component({
  selector: 'cotizar-bottom-actions',
  templateUrl: 'cotizar-bottom-actions.component.html',
})
export class CotizarBottomActions {
  constructor(private _bottomSheetRef: MatBottomSheetRef<CotizarBottomActions>) {}

  openLink(actionName): void {
    this._bottomSheetRef.dismiss(actionName);
    event.preventDefault();
  }
}
