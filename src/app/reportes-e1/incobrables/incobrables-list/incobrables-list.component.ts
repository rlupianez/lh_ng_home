import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
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
  selector: 'app-incobrables-list',
  templateUrl: './incobrables-list.component.html',
  styleUrls: ['./incobrables-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class IncobrablesListComponent implements OnInit {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Incobrables';

  apiPath: string = '/rws_panul/LIST_PANUL';

  tableTitle: string = 'Resultado de Búsqueda'
  panelExpanded: boolean = true;
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


  /***
   *  Anuladas por incobrables
   */

  anuladasColumns: object;

  anuladasListItems: any;


  incobrableSelected: string;
  incobrablesPath: string;

  
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
    this.anuladasListItems = [];
    this.columns = {
      // select : { label: 'Select', class: 'col' },
      cod_prdorg : { label: 'Organizador', visible: true, class: 'col', suffix: 'org_apeynom', cellStyle: 'text-left' },
      cod_prod : { label: 'Productor', visible: true, class: 'col', suffix: 'prod_apeynom' },
      sec_desde: { label: 'Sección desde', visible: true, class: 'col' },
      sec_hasta: { label: 'Sección hasta', visible: true, class: 'col' },
      fecha_hasta: { label: 'Exigible hasta', visible: true, class: 'col' },
      descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg', field:"lnk_rep" }
    };
    
    this.anuladasColumns = {
      // select : { label: 'Select', class: 'col' },
      cod_prod : { label: 'Productor', visible: true, class: 'col', suffix: 'prod_apeynom' },
      seccion: { label: 'Sección', visible: true, class: 'col' },
      fecha_desde: { label: 'Fecha desde', visible: true, class: 'col' },
      fecha_hasta: { label: 'Fecha hasta', visible: true, class: 'col' },
      descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg', field:"lnk_rep" }
    };

    this.filtersFields = {
      p_cod_prod : {
        label: { text: 'Productor', class: 'col-sm-4' },
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
      incobrables: {
        label: 'Incobrables',
        control: {
          type: 'select',
          list: [
            { key: 'Anular', value: 'A Anular' },
            { key: 'Anuladas', value: 'Anuladas' },
          ],
          options: {
            value: 'value',
            key: 'key'
          },
          pasteFieldOnSelect: 'key',
          hasEmptyOption: true
        },
        actions: {
          Anuladas: { hidden: { p_cod_seccion: false, p_fec: false, p_sec_desde: true, p_sec_hasta: true, p_fecha_hasta: true } },
          Anular: { hidden: { p_cod_seccion: true, p_fec: true, p_sec_desde: false, p_sec_hasta: false, p_fecha_hasta: false } }
        },
        class: 'col-sm-12 col-md-12 col-lg-2',
        required: true
      },
      p_cod_seccion: {
        label: { text: 'Seccion', class: 'col-sm-4' },
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
        class: 'col-sm-12 col-md-12 col-lg-2',
        hidden: true
      },
      p_fec: {
        control: {
          type: 'date-range',
          format: 'dd/mm/yyyy',
          config: {
            dateInputFormat: 'DD/MM/YYYY',
            max: moment(),
            min: moment().subtract(7,'years')
          },
          defaultValues : {
            hasta: null,
            desde: null
          }
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        required: false,
        hidden: true
      },
      p_sec_desde: {
        label: { text: 'Seccion Desde', class: 'col-sm-4' },
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
        class: 'col-sm-12 col-md-12 col-lg-2',
        hidden: true
      },
      p_sec_hasta: {
        label: { text: 'Seccion Hasta', class: 'col-sm-4' },
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
        class: 'col-sm-12 col-md-12 col-lg-2',
        hidden: true
      },
      p_fecha_hasta: {
        label: 'Exigible Hasta',
        control: { 
          type: 'datepicker',
          format: 'dd/mm/yyyy',
          defaultValue: moment(),
          config: {
            min: moment().startOf('month').subtract( 7 ,'years'),
            max: moment().endOf('month').add( 2 ,'years')
          }
        },
        class: 'col-sm-12 col-md-12 col-lg-2',
        required: true,
        hidden: true
      }
    };

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.form = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));


  }


  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      "p_o_sesion":1234,
      "p_limite": 1000, 
      "p_nropag": 0,            
      "p_regxpag": this.tablePageSize
    };
    
    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];
    if(oFilterData['p_cod_seccion']){
      oFilterData['p_cod_seccion'] = oFilterData['p_cod_seccion'] < 10 ? '0' + oFilterData['p_cod_seccion'].toString() : oFilterData['p_cod_seccion'].toString();
    }
    

    if(oFilterData.hasOwnProperty('p_fec') && oFilterData['p_fec'].desde && oFilterData['p_fec'].hasta){
      const periodos = {
        p_fec_desde: oFilterData['p_fec'].desde.format('DD/MM/YYYY').toString(),
        p_fec_hasta: oFilterData['p_fec'].hasta.format('DD/MM/YYYY').toString(),
      } 

      delete oFilterData['p_fec'];
  
      oFilterData = Object.assign(oFilterData,periodos);
    }

    if(oFilterData.hasOwnProperty('p_fecha_hasta')){
      oFilterData['p_fecha_hasta'] = oFilterData['p_fecha_hasta'].format('DD/MM/YYYY').toString();
    }


    this.filterModel = oFilterData;
    console.log('filters data', this.filterModel);
    
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.incobrableSelected = this.filterModel['incobrables'];
    // dependiendo de el tipo de incobrables
    this.incobrablesPath = '/listados/LIST_AANUL';

    if(this.incobrableSelected === 'Anuladas'){
      this.incobrablesPath = '/listados/LIST_PANUL';
    }

    this.apiService.post(this.incobrablesPath, this.filterModel).subscribe( (data : object) => {
      console.log('post data', data);
      if(!data){
        this.isLoadingResults = false;  
        this.uiService.loadingDataTable(false);
        return;
      }

      if(this.incobrableSelected === 'Anuladas'){
        this.anuladasListItems = new MatTableDataSource(data['result']);
      }else{
        this.listItems = new MatTableDataSource(data['result']);
      }
      
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

    this.apiService.getDataTable(this.incobrablesPath, bodyData).subscribe( data => {
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
      console.log('data', data);
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
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    this.toasterService.show('Descargando ...', 'info');

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('anulados-incobrables', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.progressBarService.hide();
    }, 
    error => {
      this.progressBarService.hide();
    });
  }

}
