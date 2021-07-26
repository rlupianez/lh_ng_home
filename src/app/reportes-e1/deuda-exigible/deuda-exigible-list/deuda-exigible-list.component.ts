import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DeudaExigible } from '../deuda-exigible.model';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';


import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';

declare let $: any;
import * as moment from 'moment';
import { UiService } from '@core/services/ui.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';


@Component({
  selector: 'app-deuda-exigible-list',
  templateUrl: './deuda-exigible-list.component.html',
  styleUrls: ['./deuda-exigible-list.component.css'],
  providers: [ FilterToolbarService ]
})
export class DeudaExigibleListComponent implements OnInit, AfterViewInit {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Deuda Exigible';
  
  apiPath: string = '/listados/LIST_EXIG';

  tableTitle: string = 'Resultado de Búsqueda'
  panelExpanded: boolean = true;
  rowDetails: any[];
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  listItems: any;
  columns: object;
  filtersFields: object;
  tablePageSize: number = 25;

  /**
   * Ultimo form filter aplicado, se usa para mandar los datos para descargar el excel
   */
  formFilterObject: object = null;

  /**
   * Observer que notifica si los campos de filtros han sido modificados.
   * Sirve para identificar si lo que se esta mostrando en la tabla corresponde a los filtros en pantalla.
   */
  filtersHasChange: Subject<boolean> = new Subject<boolean>();

  /**
   * Especifica si posee paginador o boton "load more"
   */
  loadMorePaginator: boolean = true; 

  excelLink: string;
  
  formVisibility: Object;

  form: FormGroup;

  constructor(
    private apiService: ApiService, 
    private progressBarService: ProgressBarService,
    private toasterService: ToasterService,
    private fileDowloadService: FileDownloaderService,
    private uiService: UiService,
    private formValidator: FormsFactoryService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.getRetenciones();
    this.listItems = [];
    this.columns = {
      // select : { label: 'Select', class: 'col' },
      seccion: { label: 'Sección', visible: true, class: 'col', cellStyle: 'text-left' },
      cod_prdorg : { label: 'Organizador', visible: true, class: 'col', suffix: 'org_apeynom', cellStyle: 'text-left' },
      cod_prod : { label: 'Productor', visible: true, class: 'col', suffix: 'prod_apeynom', cellStyle: 'text-left' },
      poliza: { label: 'Póliza', visible: true, class: 'col', cellStyle: 'text-center' },
      endoso: { label: 'Endoso', visible: true, class: 'col', cellStyle: 'text-center' },
      nro_cuota: { label: 'Nro Cuota', visible: true, class: 'col',  cellStyle: 'text-center' },
      vto_cuota: { label: 'Fecha Vto Cuota', visible: true, class: 'col', cellStyle: 'text-right' },
      // cod_prod: { label: 'Productor', visible: true, class: 'col' },
      // prod_apeynom: { label: 'Nombre Productor', visible: true, class: 'col' },
      aseg_bloqueado: { 
        label: '', 
        visible: true, 
        class: 'col', 
        formatter: {
          N: { value: '' },
          S: { icon: 'block' }
        } ,
        cellStyle: 'text-left'
      },
      asegurado: { label: 'Asegurado', visible: true, class: 'col', cellStyle: 'text-left' },
      // usar pipe
      
      moneda: { label: 'Moneda', visible: true, class: 'col' },
      imp_pend_cuota: { label: 'Importe', visible: true, class: 'col', cellStyle: 'text-right' },
      forma_pago: { label: 'Forma de Pago', visible: true, class: 'col', cellStyle: 'text-left' },
      // descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg' }
    }

    this.filtersFields = {
      p_cod_prod: {
        label: 'Productor',
        control: { 
          type: 'productor-control',
          class: 'col-sm-8',
          path: '/listas/LIST_PAS',
          options: {
            value: 'nombre',
            key: 'codpas',
            description: 'codpas'
          },
          pasteFieldOnSelect: 'nombre',
          defaultValue: '',
        },
        class: 'col-sm-12 col-md-12 col-lg-3'
      },
      /*p_fecha_hasta: {
        label: 'Exigible Hasta',
        control: { 
          type: 'datepicker',
          format: 'dd/mm/yyyy',
          defaultValue: '',
          config: {
            min: moment().startOf('month').subtract( 7 ,'years'),
            max: moment().endOf('month').add( 2 ,'years')
          }
        },
        class: 'col-sm-12 col-md-12 col-lg-2',
        required: true
      },*/
      p_fecha: {
        label: 'Exigible',
        control: {
          type: 'date-range',
          format: 'dd/mm/yyyy',
          config: {
            dateInputFormat: 'DD/MM/YYYY',
            max: moment(),
            min: moment().subtract(7,'years'),
            maxHasta: moment().add(13,'month')
          },
          defaultValues : {
            hasta: null,
            desde: null
          }
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        required: true
      },
      p_cod_sec: {
        label: { text: 'Sección', class: 'col-sm-4' },
        control: { 
          type: 'select',
          class: 'col-sm-8',
          path: '/listas/LIST_TIPOS_SECCIONES',
          options: {
            value: 'label',
            key: 'value'
          },
          pasteFieldOnSelect: 'value',
          defaultValue: '',
          hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-2'
      },
      p_forma_pago: {
        label: { text: 'Forma de Pago', class: 'col-sm-4' },
        control: { 
          type: 'select',
          class: 'col-sm-8',
          path: '/listas/LIST_TIPOS_FORMA_PAGOS',
          options: {
            value: 'label',
            key: 'value'
          },
          pasteFieldOnSelect: 'value',
          defaultValue: '',
          hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-2'
      },
    };

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.form = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));

  }


  ngAfterViewInit() {}

  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      "p_o_sesion":1234,
      "p_limite": 1000, 
      "p_nropag": 0,            
      "p_regxpag": this.tablePageSize
    };
    
    this.filterModel = Object.assign(oFilterData,opts);

    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];

    if(oFilterData.hasOwnProperty('p_fecha') && oFilterData['p_fecha'].desde && oFilterData['p_fecha'].hasta){
      const periodos = {
        p_fecha_desde: oFilterData['p_fecha'].desde.format('DD/MM/YYYY').toString(),
        p_fecha_hasta: oFilterData['p_fecha'].hasta.format('DD/MM/YYYY').toString(),
      } 

      delete oFilterData['p_fecha'];
  
      oFilterData = Object.assign(oFilterData,periodos);
    }
    // recibe string el post de la api -- se le agrega el 0, no esta bueno
    if(this.filterModel['p_cod_sec']){
      this.filterModel['p_cod_sec'] = '0' + this.filterModel['p_cod_sec'].toString();
    }
    
    console.log('filter params', this.filterModel);
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : object) => {
      console.log('response api get', data);
      if(data){
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;
        
        if(data['result'].length > 0){
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          this.excelLink = data['p_lnk_excel'];
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
          this.excelLink = null;
        }

        this.applyFilterInTable.next(0);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      
    },
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
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
      console.log('response api data', data);
    },
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
    });

  }

  filterFieldChange(changed: boolean){
    // console.log('filters has change', changed);
    this.filtersHasChange.next(true);
  }

  downloadExcel(data: object){

    if(!this.excelLink){
      return; 
    }

    this.formFilterObject['p_regxpag'] = 10000;
    this.progressBarService.show();
    this.toasterService.show('Descargando ...', 'info');

    /*this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('deuda-exigible', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.progressBarService.hide();
    });
    */
   window.open(this.excelLink);
   this.progressBarService.hide();

  }

}
