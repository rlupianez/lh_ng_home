import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';

import * as moment from 'moment';
import { UiService } from '@core/services/ui.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';

const CtaCteFilters = {
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
    class: 'col-sm-12 col-md-12 col-lg-4'
  },
  p_tipo_rep: {
    label: 'Documento',
    control: {
      type: 'button-toggle',
      options: [
        { key: 'EXCEL', value: 'EXCEL', iconSvg: 'down_excel', tooltip: 'Excel' },
        { key: 'PDF', value: 'PDF', icon: 'far fa-file-pdf fa-lg', tooltip: 'PDF' },
      ],
      pasteFieldOnSelect: 'key'
    },
    actions: {
      EXCEL: { hidden: { p_fecha: false, p_periodo: true, p_formato: true } },
      PDF: { hidden: { p_fecha: true, p_periodo: false, p_formato: false } }
    },
    class: 'col-sm-12 col-md-12 col-lg-2',
    required: true
  },
  p_periodo: {
    label: { text: 'Fechas', class: 'col-sm-5' },
    control: { 
      type: 'monthyear-range',
      class: 'col-sm-7',
      path: '/listas/LIST_PERIODOS',
      config: {
        dateInputFormat: 'MM/YYYY',
        max: moment().add(20,'years'),
        min: moment(),
        maxHasta: moment().add(20,'years'),
        maxDesde: moment()
      },
      defaultValues : {
        hasta: moment(),
        desde: moment()
      }
    },
    hidden: true,
    required: true,
    class: 'col-sm-12 col-md-12 col-lg-4',
  },
  /*p_formato: {
    label: 'Formato',
    control: { 
      type: 'select',
      options: [
        { key: 'R', value: 'Resumido' },
        { key: 'D', value: 'Detallado' }
      ],
      pasteFieldOnSelect: 'key',
      hasEmptyOption: true
    },
    hidden: true,
    class: 'col-sm-12 col-md-12 col-lg-3'
  },*/
  p_fecha: {
    control: {
      type: 'date-range',
      format: 'dd/mm/yyyy',
      config: {
        dateInputFormat: 'DD/MM/YYYY',
        max: moment(),
        min: moment().subtract(7,'years')
      },
      /*defaultValues : {
        hasta: moment().subtract(1,'days'),
        desde: moment().startOf('month')
      }*/
      defaultValues : {
        hasta: null,
        desde: null
      }
    },
    hidden: true,
    class: 'col-sm-12 col-md-12 col-lg-4',
    required: true
  }

};

@Component({
  selector: 'app-cuenta-corriente-list',
  templateUrl: './cuenta-corriente-list.component.html',
  styleUrls: ['./cuenta-corriente-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class CuentaCorrienteListComponent implements OnInit {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Cuenta Corriente';

  apiPath: string = '/listados/LIST_CC';

  tableTitle: string = 'Resultado de Búsqueda';
  panelExpanded: boolean = true;
  rowDetails: any[];
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  listItems: any = [];
  columns: object;
  filtersFields: object;
  tablePageSize: number = 25;
  showTable: boolean = false;
  pdfFiltersApplied: boolean = false;

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
  
  excelBaseUrl: string;

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

    // modificar eliminar la ultima barra
    this.excelBaseUrl = this.apiService.getBaseUrl();
    console.log('excel url', this.excelBaseUrl);

    this.columns = {
      // select : { label: 'Select', class: 'col' },
      // cod_prod : { label: 'Cod. Productor', visible: true, class: 'col' },
      cod_prdorg : { label: 'Organizador', visible: true, class: 'col', suffix: 'org_apeynom', cellStyle: 'text-left' },
      cod_prod : { label: 'Productor', visible: true, class: 'col', suffix: 'prod_apeynom', cellStyle: 'text-left' },
      // prod_apeynom : { label: 'Productor', visible: true, class: 'col' },
      periodo: { label: 'Período', visible: true, class: 'col' },
      // formato: { label: 'Formato', visible: true, class: 'col' },
      descargar: { 
        label: 'Descargar', 
        class: 'col', 
        action: true, 
        field: 'lnk_rep_r',
        tooltip: 'Resumido', 
        icon: 'far fa-file-pdf fa-lg',
        // muestra 2 iconos en la misma columna
        prefix: {
          field: 'lnk_rep_d',
          icon: 'far fa-file-pdf fa-lg',
          tooltip: 'Detallado'
        }
      }
    };

    this.filtersFields = CtaCteFilters;
    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.form = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));
  }

  applyFiltersPDF(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      'p_o_sesion':1234,
      'p_limite': 1000, 
      'p_nropag': 0,            
      'p_regxpag': this.tablePageSize || this.tablePageSize
    };
    
    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];
    //console.log('filters data', oFilterData);

    if(oFilterData.hasOwnProperty('p_periodo')){
      const periodos = {
        p_periodo_desde: oFilterData['p_periodo'].desde.format('DD/MM/YYYY').toString(),
        p_periodo_hasta: oFilterData['p_periodo'].hasta.format('DD/MM/YYYY').toString(),
      };

      periodos.p_periodo_desde = periodos.p_periodo_desde.slice(3, periodos.p_periodo_desde.length);
      periodos.p_periodo_hasta = periodos.p_periodo_hasta.slice(3, periodos.p_periodo_hasta.length); 

      delete oFilterData['p_periodo'];
  
      this.filterModel = Object.assign(oFilterData,periodos);
    }
    
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data: object) => {
      //console.log('api get', data);
      this.listItems = new MatTableDataSource(data['result']);
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      this.resultLength = data['pagination'].totalItems;

      if(data['result'].length > 0){
        // se guarda los ultimos datos de filtros aplicados
        this.formFilterObject = this.filterModel;
        // this.panelExpanded = false;
      } else { // si no trae datos se limpia
        this.formFilterObject = null;
      }

      this.applyFilterInTable.next(0);
      this.pdfFiltersApplied = true;
    });
    
  }

  applyFiltersExcel(oFilterData: object){
    const opts = {	
      'p_o_sesion':1234,
      'p_limite': 1000,        
      'p_regxpag': this.tablePageSize
    };
    
    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];
    
    if(oFilterData.hasOwnProperty('p_fecha')){
      const periodos = {
        p_fecha_desde: oFilterData['p_fecha'].desde.format('DD/MM/YYYY').toString(),
        p_fecha_hasta: oFilterData['p_fecha'].hasta.format('DD/MM/YYYY').toString(),
      };

      delete oFilterData['p_fecha'];
  
      this.filterModel = Object.assign(oFilterData,periodos);
    }

    //console.log('filters data', oFilterData);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data: object) => {
      // console.log('retenciones get', data);
      if(data['result'].length > 0){
        window.open( this.excelBaseUrl + '/' + data['result'][0]['lnk_rep_d'],'_blank');
      }
    });
    
  }

  
  pageChange(paginationData: object){

    const bodyData = this.filterModel;
    bodyData['p_nropag'] = paginationData['pageIndex'],            
    bodyData['p_regxpag'] = paginationData['pageSize'];

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.getDataTable(this.apiPath ,bodyData).subscribe( data => {
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
      //console.log('cuenta corriente data', data);
    });

  }

  applyFilters(oFilterData: object) {
  
    if( oFilterData['p_tipo_rep'] === 'PDF'){
      this.showTable = true;
      this.applyFiltersPDF(oFilterData);
    }else{
      this.showTable = false;
      this.applyFiltersExcel(oFilterData);
    }
    
  }

  filterFieldChange(filtersData: object){
    // console.log('filters has change', filtersData);
    // Mostrar/Ocultar tabla  
    if (filtersData['p_tipo_rep'] !== 'PDF' ){
      this.showTable = false;
    }else{
      this.showTable = true;

      // si se abre por primera ver el listado con la opcion de PDF
      // si el productor NORMAL y estan completods todos los datos
      // se debe ejectur el listado automaticamente
      // SOLO LA PRIMERA VEZ
      if(!this.pdfFiltersApplied && filtersData['p_cod_prod']){

        // si el productor es normal y todos los datos estan complicos
        if(filtersData['p_cod_prod'] && filtersData['p_periodo']){
          this.applyFiltersPDF(filtersData);
        }
        
      }
    }

    this.filtersHasChange.next(true);
  }

  downloadExcel(data: object){
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    this.toasterService.show('Descargando ...', 'info');

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data: any) => {
      const filename = this.fileDowloadService.generateFilename('cuenta-corriente', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.progressBarService.hide();
    });
  }


}
