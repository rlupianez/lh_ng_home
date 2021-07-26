import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '@core/services/http/api.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { UiService } from '@core/services/ui.service';
import { Router } from '@angular/router';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { columns, filters } from '@app/siniestros/siniestros-list/siniestros-list.config';
import { config } from '@core/config/app-config';
import { MatTableDataSource } from '@angular/material/table';
import {Location} from '@angular/common';
import { NavigationService } from '@core/services/navigation.service';
import { SiniestrosService } from '../siniestros.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Validator de Rango
 */
const validateRangeDate = function(group: FormGroup) {

  const startDate = group.controls.desde.value;
  const endDate = group.controls.hasta.value;

  if (!group.controls.desde.validator && !group.controls.hasta.validator) {
    return null;
  }

  if (!startDate || !endDate) {
    return null;
  }

  if (startDate > endDate) {
    return { greaterThan: true };
  }

  if (startDate < endDate) {
    return null;
  }

  return null;
}

@Component({
  selector: 'app-siniestros-list',
  templateUrl: './siniestros-list.component.html',
  styleUrls: ['./siniestros-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class SiniestrosListComponent implements  OnInit, AfterViewInit {

  // retenciones: RetencionesIva[] = [];
  apiPath: string = '/listados/LISTADO_SINIESTROS';
  tableTitle: string = 'Siniestros';
  panelExpanded: boolean = true;
  listItems: any;
  columns: object;
  rowDetails: any[];
  filtersFields: object;
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  formVisibility: object;
  filterFormGroup: FormGroup;
  tablePageSize: number = 25;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  loadMorePaginator: boolean = true;

  /**
   * Ultimo form filter aplicado, se usa para mandar los datos para descargar el excel
   */
  formFilterObject: object = null;

  /**
   * Observer que notifica si los campos de filtros han sido modificados.
   * Sirve para identificar si lo que se esta mostrando en la tabla corresponde a los filtros en pantalla.
   */
  filtersHasChange: Subject<boolean> = new Subject<boolean>();
  initialLoading: boolean = false;


  constructor(
    private apiService: ApiService,
    private siniestrosService: SiniestrosService,
    private formBuilder: FormBuilder, 
    private formValidator: FormsFactoryService, 
    private uiService: UiService,
    private router: Router,
    private filterToolbarService: FilterToolbarService,
    private progressBarService: ProgressBarService,
    private navService: NavigationService,
    private fileDowloadService: FileDownloaderService) {

  }

  ngOnInit() {
    // this.getRetenciones();
    this.listItems = [];
    this.columns = columns;
    this.filtersFields = filters;

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    //const filtersStoreData = this.filterToolbarService.getFiltersData();
    this.filterFormGroup = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));
   

    const params = this.filterToolbarService.getRouteParams();

    if(params){
      //console.log('params', params);
      // this.filterFormGroup.get('p_cod_prod').setValue(params['p_cod_prod']);
    }


    this.filterFormGroup.get('p_cod_prod').valueChanges.subscribe( pCod => {
      const aseguradoId = 'p_x_asegurado';
      // console.log('codigo prod', pCod);
      if(pCod && pCod['codpas']){

        this.filtersFields[aseguradoId]['control']['filters'] = {
          p_cod_prod: pCod['codpas']
        };

        this.filtersFields[aseguradoId] = { ...this.filtersFields[aseguradoId] };

      }else{

        this.filtersFields[aseguradoId]['control']['filters'] = null;
        
      }
    });


    this.filterFormGroup.get('p_cod_sec').valueChanges.subscribe( codSec => {    
      
      // Automotores Motovehiculos Aero Cascos
      if(codSec === 3 || codSec === 13 || codSec === 14 || codSec === 18){
        this.hideField('p_dominio', false);
      }else{
        this.hideField('p_dominio', true);
      }
      // Combinados
      if(codSec === 2){
        this.hideField('p_ubicacion_riesgo', false);
      }else{
        this.hideField('p_ubicacion_riesgo', true);
      }

      // Vida y Persona - Acciones Personales - Acciones Pers Plenus
      if((codSec >= 23 && codSec <= 26)  || codSec === 10 || codSec === 21){
        this.hideField('p_dni_cert_vida', false);
      }else{
        this.hideField('p_dni_cert_vida', true);
      }

      // Agricola
      if(codSec === 12){
        this.hideField('p_riesgo_agricola', false);
      }else{
        this.hideField('p_riesgo_agricola', true);
      }
      
    });

    this.filterFormGroup.valueChanges.pipe(
      debounceTime(100), distinctUntilChanged((p:any, n:any) => JSON.stringify(p) === JSON.stringify(n)))
    .subscribe( data => {
      this.setRequiredFields();
    });

  }

  get hideWhenLoading(){
    return this.initialLoading && config.ux.skeletonLoadingEnable;
  }

  ngAfterViewInit() {}


  applyFilters(oFilterData: object) {
    this.filterModel = this.getParsedFormDataInValidFilters(oFilterData);
    this.filterToolbarService.saveLastAppliedFilters(oFilterData, this.filterModel, this.apiPath);
    
    console.log('filter params', this.filterModel);

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.siniestrosService.getSiniestros(this.filterModel).subscribe( (data : object) => {
      console.log('Siniestros responde api', data);
      this.filterToolbarService.saveReportResults(data['result']);
      if(data){
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;
        
        if(data['result'].length > 0){
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          // this.excelLink = data['p_lnk_excel'];
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
          // this.excelLink = null;
        }

        this.applyFilterInTable.next(0);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      
    },
    error => {
      this.filterToolbarService.saveReportResults([]);
      this.uiService.loadingDataTable(false);
      this.isLoadingResults = false;
    });
  }

  pageChange(paginationData: object){

    const bodyData = this.filterModel;
    bodyData['p_nropag'] = paginationData['pageIndex'],            
    bodyData['p_regxpag'] = paginationData['pageSize'];

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.getDataTable(this.apiPath, bodyData).subscribe( data => {
      
      // SI POSEE EL BOTON "Mostrar mas"
      // si es pagina 0 debe volver limpiar la lista y setear los nuevos items
      // sino los acumula

      if(this.loadMorePaginator && paginationData['pageIndex'] !== 0){
        this.listItems.data = this.listItems.data.concat(data);
      }else{
        this.listItems = new MatTableDataSource(data);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      //console.log('api response data', data);
    },
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
    });

  }

  onRowCliked(rowData: object){
    //console.log('row', rowData);

    this.navService.navigateToPage(
      {
        baseUrl: '/siniestros',
        modulePath: '/consultas',
        pagePath: `/consulta-siniestros/${rowData['o_siniestro']}/${rowData['cod_sec']}`
      }
    );
  
  }

  getParsedFormDataInValidFilters(oFilterData: object){

    /***
     * 
     *  Para evitar estoy hay que crear una clase, en este caso SINIESTRO
     *  que resive el objecto OfilterData en el constructor y lo convierte en la interfaz necesaria 
     * para llamar a la api
     * 
     */
    const opts = { 
      p_nropag :0,
      p_regxpag: this.tablePageSize,
      p_limite: 1000
    };


    let filterModel = { ...oFilterData, ...opts};

    if(oFilterData['p_cod_prod']['codpas']){
      filterModel['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'].toString() || "";
    }

    
    
    if( oFilterData['p_x_asegurado']['cod_asegurado']){
      filterModel['p_x_asegurado'] = oFilterData['p_x_asegurado']['cod_asegurado'];  
    }else {
      filterModel['p_x_asegurado'] = '';
    }

    // filterModel['p_cod_asegu'] = oFilterData['p_cod_asegu']['cod_asegurado'] || oFilterData['p_cod_asegu'];

    if(filterModel['p_fec_siniestro'] && ( filterModel['p_fec_siniestro']['hasta'] || filterModel['p_fec_siniestro']['desde'] )){
      filterModel['p_f_hasta'] = oFilterData['p_fec_siniestro']['hasta'] ? oFilterData['p_fec_siniestro']['hasta'].format('DD/MM/YYYY').toString() : "";
      filterModel['p_fec_siniestro'] = oFilterData['p_fec_siniestro']['desde'] ? oFilterData['p_fec_siniestro']['desde'].format('DD/MM/YYYY').toString() : "";
      // delete filterModel['p_fec_siniestro'];
    }else{
      delete filterModel['p_fec_siniestro'];
    }
    
    
    // recibe string el post de la api -- se le agrega el 0, no esta bueno
    if(filterModel['p_cod_sec']){
      filterModel['p_cod_sec'] = /*'0' + */ filterModel['p_cod_sec'].toString();
    }

    return filterModel;
  }

  downloadExcel(data: object){
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.siniestrosService.getSiniestros(this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('siniestros', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    });
  }

  tableLinkClicked(data){
    if(data['columnName'] === 'asegurado_link'){

      // link a asegurado
      if(data['rowData'].cod_asegu){

        this.navService.navigateToPage(
          {
            baseUrl: '/consultas',
            modulePath: '/asegurados',
            pagePath: `/asegurado-basico/${data['rowData'].cod_asegu}`
          }
        );
        //this.router.navigate([`/consultas/asegurados/asegurado-basico/${data['rowData'].cod_asegu}`]);
      } 
      
    }

    if(data['columnName'] === 'poliza_link'){

      // link a poliza
      if(data['rowData'].poliza && data['rowData'].cod_sec){
        this.navService.navigateToPage(
          {
            baseUrl: '/reportes',
            modulePath: '/reportes-productores',
            pagePath: `/poliza-cartera/${data['rowData'].poliza}/${data['rowData'].cod_sec}/0/0`
          }
        );
       // this.router.navigate([`/reportes-productores/poliza-cartera/${data['rowData'].poliza}/${data['rowData'].cod_sec}/0/0`]);
      } 
      
    }
    
  }

  hideField(id: string, hide: boolean ){
    this.formVisibility[id] = hide; 
    this.filterFormGroup.get(id).enable();
    this.filterFormGroup.get(id).setValue('');
  }

  /**
   * Campos obligatorios segun filtros ingresados
   */
  setRequiredFields(){
    const data = this.filterFormGroup.value;
    if((data.p_cod_poliza || data.p_o_siniestro ) && (!data.p_fec_siniestro.desde && !data.p_fec_siniestro.hasta)){
      //console.log('marcar fechas como no obligatorias');
      let cFecEmi = this.filterFormGroup.get('p_fec_siniestro');
      
      cFecEmi.get('desde').clearValidators();
      cFecEmi.get('desde').updateValueAndValidity();

      cFecEmi.get('hasta').clearValidators();
      cFecEmi.get('hasta').updateValueAndValidity();


      
    }else{
      // console.log('marcar fechas como obligatorias');
      let cFecEmi = this.filterFormGroup.get('p_fec_siniestro');
      
      cFecEmi.setValidators([validateRangeDate]);
      cFecEmi.updateValueAndValidity();

      //cFecEmi.get('desde').clearValidators();
      cFecEmi.get('desde').setValidators([Validators.required]);
      cFecEmi.get('desde').updateValueAndValidity();

      // cFecEmi.get('hasta').clearValidators();
      cFecEmi.get('hasta').setValidators([Validators.required]);
      cFecEmi.get('hasta').updateValueAndValidity();
      
      
    } 
  
  }

}
