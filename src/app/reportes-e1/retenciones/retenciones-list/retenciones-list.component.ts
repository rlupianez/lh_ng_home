import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';

import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';

import * as moment from 'moment';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UiService } from '@core/services/ui.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';

declare let $: any;

const columns = {
 // select : { label: 'Select', class: 'col', visible: false },
  cod_prdorg : { label: 'Organizador', visible: true, class: 'col', suffix: 'org_apeynom', cellStyle: 'text-left' },
  cod_prod : { label: 'Productor', visible: true, class: 'col', suffix: 'prod_apeynom', cellStyle: 'text-left' },
  periodo: { label: 'Periodo', visible: true, class: 'col' },
  nro_comprobante: { label: 'Comprobante', visible: true, class: 'col' },
  tipo_retencion: { label: 'Tipo de Retención', visible: true, class: 'col', cellStyle: 'text-left' },
  fecha_retencion: { label: 'Fecha', visible: true, class: 'col' },
 // base_imponible: { label: 'Base Imponible', visible: false, class: 'col', cellStyle: 'text-right' },
  importe: { label: 'Importe', visible: true, class: 'col', cellStyle: 'text-right' },
  certificado: { label: 'Certificado', visible: true, class: 'col' },
  descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg', field: 'lnk_reporte' }
};

const filters = {
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
    label: { text: 'Fechas', class: 'col-sm-5' },
    control: { 
      type: 'monthyear-range',
      class: 'col-sm-7',
      path: '/listas/LIST_PERIODOS',
      config: {
        max: moment(),
        min: moment().subtract(7,'years')
      },
      /*  max: moment().endOf('month').subtract(1,'month'),
        min: moment().endOf('month').subtract(1,'month').subtract(7,'years')
      },*/
      defaultValues: {
        desde: " ",
        hasta:" "
     }
    },
    class: 'col-sm-12 col-md-12 col-lg-4',
    required: true
  },
  p_tipo_retencion: {
    label: { text: 'Retención', class: 'col-sm-4' },
    control: { 
      type: 'select',
      class: 'col-sm-8',
      path: '/listas/LIST_TIPOS_RET',
      options: {
        value: 'descripcion',
        key: 'cod_ret'
      },
      pasteFieldOnSelect: 'cod_ret',
      defaultValue: '',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-2'
  },
  p_tipo_comp: {
    label: { text: 'Tipo Comprobante', class: 'col-sm-4' },
    control: { 
      type: 'select',
      class: 'col-sm-8',
      path: '/listas/LIST_TIPOS_COMPROBANTES',
      options: {
        value: 'descripcion',
        key: 'cod_tipo_comp'
      },
      pasteFieldOnSelect: 'cod_tipo_comp',
      defaultValue: '',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-2',
    hidden: true,
    disabled: true
  }
};

@Component({
  selector: 'app-retenciones-list',
  templateUrl: './retenciones-list.component.html',
  styleUrls: ['./retenciones-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class RetencionesListComponent implements OnInit, OnDestroy {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Retenciones';

  apiPath: string = '/listados/LIST_RET';

  tableTitle: string = 'Resultado de Búsqueda'
  panelExpanded: boolean = true;
  rowDetails: any[];
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  listItems: MatTableDataSource<any>;
  columns: object;
  filtersFields: object;
  tablePageSize: number = 25;

  retForm: FormGroup;

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
  

  formSubscription: Subscription = new Subscription();

  formVisibility: Object;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private progressBarService: ProgressBarService,
    private formValidator: FormsFactoryService,
    private uiService: UiService,
    private fileDowloadService: FileDownloaderService,
    private filterToolbarService: FilterToolbarService) {
  }

  ngOnInit() {
    this.listItems = new MatTableDataSource([]);
    this.columns = columns;
    this.filtersFields = filters;
    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    //const filtersStoreData = this.filterToolbarService.getFiltersData();
    this.retForm = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));
    /*if(filtersStoreData.lastAppliedFilters){
      this.retForm.patchValue(filtersStoreData.lastAppliedFilters);
      this.retForm.markAsTouched();
    }*/
    this.formSubscription = this.retForm.get('p_tipo_retencion').valueChanges.subscribe( value => {
      // console.log('p_tipo_comp', value);
      if(value === 'IVA'){
        this.retForm.get('p_tipo_comp').enable();
        let field = { ...this.filtersFields['p_tipo_comp'] };
        field['hidden'] = false;
        field['disabled'] = false;
        this.filtersFields['p_tipo_comp'] = field;
        this.formVisibility['p_tipo_comp'] = false;
      }else{
        this.retForm.get('p_tipo_comp').disable();
        let field = { ...this.filtersFields['p_tipo_comp'] };
        field['hidden'] = true;
        field['disabled'] = true;
        this.filtersFields['p_tipo_comp'] = field;
        this.formVisibility['p_tipo_comp'] = true;
      }
    });
  }

  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }

  getRetenciones() {
    /*this.modelService.getAll().subscribe(
      siniestros => this.retenciones = siniestros
    );*/

  }

  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      'p_o_sesion':1234,
      'p_limite': 1000, 
      'p_nropag': 0,            
      'p_regxpag': this.tablePageSize
    };
    
    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'];
    console.log('filters data', oFilterData);

    if(oFilterData.hasOwnProperty('p_periodo')){
      const periodos = {
        p_periodo_desde: oFilterData['p_periodo'].desde.format('DD-MM-YYYY').toString(),
        p_periodo_hasta: oFilterData['p_periodo'].hasta.format('DD-MM-YYYY').toString(),
      };
      
      delete oFilterData['p_periodo'];
  
      this.filterModel = Object.assign(oFilterData,periodos);
    }

    //aGanc validaciones basicas de ingreso
    //**************************************/
    if(this.filterModel['p_cod_prod'] == undefined)
    {
      alert('Debe Seleccionar Productor');
      return;
    }

    //**************************************/

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : object) => {
      if(data){
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;
        
        if(data['result'].length > 0){
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
        }
        
        this.applyFilterInTable.next(0);
      }

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
      console.log('api response data', data);
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
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('retenciones', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    });
  }

}
