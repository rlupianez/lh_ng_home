import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ComisionesFactPend } from '../comisiones-fact-pend.model';
import { Subject } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';


import * as moment from 'moment';
import { UiService } from '@core/services/ui.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
declare let $: any;

@Component({
  selector: 'app-comisiones-fact-pend-list',
  templateUrl: './comisiones-fact-pend-list.component.html',
  styleUrls: ['./comisiones-fact-pend-list.component.css'],
  providers: [ FilterToolbarService ]
})
export class ComisionesFactPendListComponent implements OnInit, AfterViewInit {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Comisiones facturadas y/o pendientes';

  apiPath: string = '/listados/LIST_COM_FP';

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
      select : { label: 'Select', class: 'col' },
      // productor : { label: 'Productor', visible: true, class: 'col' },
      periodo: { label: 'Período', visible: true, class: 'col' },
      descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg' }
    }

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
      p_periodo: {
        label: { text: 'Fechas', class: 'col-sm-4' },
        control: { 
          type: 'monthyear-range',
          class: 'col-sm-7',
          path: '/listas/LIST_PERIODOS',
          config: {
            max: null,
            min: null
          }
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        required: true
      }
    };

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.form = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));

  }


  ngAfterViewInit() {}

  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      "p_o_sesion":null,
      "p_limite": 1000, 
      "p_nropag": 0,            
      "p_regxpag": this.tablePageSize
    };
    
    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];

    if(oFilterData.hasOwnProperty('p_periodo')){
      const periodos = {
        p_periodo_desde: oFilterData['p_periodo'].desde.format('DD/MM/YYYY').toString(),
        p_periodo_hasta: oFilterData['p_periodo'].hasta.format('DD/MM/YYYY').toString(),
      }

      periodos.p_periodo_desde = periodos.p_periodo_desde.slice(3, periodos.p_periodo_desde.length);
      periodos.p_periodo_hasta = periodos.p_periodo_hasta.slice(3, periodos.p_periodo_hasta.length); 
      
      delete oFilterData['p_periodo'];
  
      this.filterModel = Object.assign(oFilterData,periodos);
    }

    console.log('filters data', this.filterModel);
    
    // this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel, true).subscribe( (data: object) => {
      //console.log('post data', data);

      if( data && data['result'] && data['result'].length > 0){
        window.open(data['result'][0]['lnk_rep'],'_blank');
      } else { // si no trae datos se limpia
        this.formFilterObject = null;
      }

      this.uiService.loadingDataTable(false);
      this.applyFilterInTable.next(0);
    });
    
  }

  
  /*pageChange(paginationData: object){

    const bodyData = this.filterModel;
    bodyData['p_nropag'] = paginationData['pageIndex'],            
    bodyData['p_regxpag'] = paginationData['pageSize'];

    this.isLoadingResults = true;

    this.apiService.getDataTable('/rws_com_fp/LIST_COM_FP',bodyData).subscribe( data => {
      // SI POSEE EL BOTON "Mostrar mas"
      // si es pagina 0 debe volver limpiar la lista y setear los nuevos items
      // sino los acumula

      if(this.loadMorePaginator && paginationData['pageIndex'] !== 0){
        this.listItems.data = this.listItems.data.concat(data);
        
      }else{
        this.listItems = new MatTableDataSource(data);
      }
      this.isLoadingResults = false;
      console.log('data', data);
    })

  }*/

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

    this.apiService.post(this.apiPath, this.filterModel, false).subscribe( (data: any) => {
      const filename = this.fileDowloadService.generateFilename('comisiones-facturadas-pendientes', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.progressBarService.hide();
    },
    error => {
      this.progressBarService.hide();
    });
  }

}
