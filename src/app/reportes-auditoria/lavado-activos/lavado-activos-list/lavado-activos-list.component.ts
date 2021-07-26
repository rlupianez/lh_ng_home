import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LavadoActivos } from '../lavado-activos.model';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/http/api.service';
import { Location } from '@angular/common';

import { columns, filters } from './lavado-activos-list.config';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { UiService } from '@core/services/ui.service';
import { Subject } from 'rxjs';

import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { config } from '@core/config/app-config';
import { ProgressBarService } from '@core/services/progress-bar.service';
declare let $: any;

import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { AseguradoBasicoService } from '@app/asegurados/asegurado-basico/asegurado-basico.service';
import { NavigationService } from '@core/services/navigation.service';
@Component({
  selector: 'app-lavado-activos-list',
  templateUrl: './lavado-activos-list.component.html',
  styleUrls: ['./lavado-activos-list.component.scss'],
  providers: [FilterToolbarService]
})
export class LavadoActivosListComponent implements OnInit, AfterViewInit {

  tableTitle: string = 'Lavado de Activos';
  panelExpanded: boolean = true;
  listItems: MatTableDataSource<unknown>;
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
    private formBuilder: FormBuilder,
    private formValidator: FormsFactoryService,
    private uiService: UiService,
    private router: Router,
    private filterToolbarService: FilterToolbarService,
    private progressBarService: ProgressBarService,
    private location: Location,
    private fileDowloadService: FileDownloaderService,
    private navService: NavigationService,
    private aseguradoService: AseguradoBasicoService) {

  }
  ngOnInit() {

    this.uiService.loadingDataTable(false);
    this.listItems = new MatTableDataSource();
    this.columns = columns;
    this.filtersFields = filters;

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.filterFormGroup = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));

    const params = this.filterToolbarService.getRouteParams();

    if (params) {
      console.log('params', params);
    }
  }
  get hideWhenLoading() {
    return this.initialLoading && config.ux.skeletonLoadingEnable;
  }

  ngAfterViewInit() { }

  applyFilters(oFilterData: object) {
    this.filterModel = this.getParsedFormDataInValidFilters(oFilterData);
    this.filterToolbarService.saveLastAppliedFilters(oFilterData, this.filterModel, this.aseguradoService.getUriAseguradosLavadoActivo());

    console.log('filter params', this.filterModel);

    this.findTable(true);
  }

  onRowCliked(rowData: object) {
    console.log('row', rowData);
    if (rowData) {
      this.navService.navigateToPage(
        {
          baseUrl: '/reportes',
          modulePath: '/reportes-auditoria',
          pagePath: "/lavado-activos/" + rowData['cod_asegurado']
        }
      );
    }
  }

  getParsedFormDataInValidFilters(oFilterData: object) {
    const opts = {
      p_nropag: 0,
      p_regxpag: 30,
      p_n_cbte_impos: "",
    };
    console.log(oFilterData);
    let filterModel = { ...oFilterData, ...opts };

    if (filterModel['p_fec_vig'] && filterModel['p_fec_vig']['hasta'] && filterModel['p_fec_vig']['desde']) {
      filterModel['p_fec_doc_desde'] = oFilterData['p_fec_vig']['desde'].format('DD/MM/YYYY').toString() || "";
      filterModel['p_fec_doc_hasta'] = oFilterData['p_fec_vig']['hasta'].format('DD/MM/YYYY').toString() || "";
      delete filterModel['p_fec_vig'];
    }

    if (oFilterData['p_buscar']['cod_asegurado']) {
      filterModel['p_buscar'] = oFilterData['p_buscar']['cod_asegurado'];
    }
    filterModel['p_limit'] = 1000;
    return filterModel;
  }

  downloadExcel(data: object) {
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.aseguradoService.getAseguradosLavadoActivo(this.filterModel).subscribe((data: any) => {
      const filename = this.fileDowloadService.generateFilename('lavado-activos', this.filterModel);

      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    });
  }

  tableLinkClicked(data) {
    if (data['columnName'] === 'asegurado_link') {

      // link a asegurado
      if (data['rowData'].cod_asegu) {
        this.router.navigate([`/asegurado-basico/${data['rowData'].cod_asegu}`]);
      }
    }

    if (data['columnName'] === 'impresiones_link') {

      // link a asegurado
      if (data['rowData'].lnk_impresion) {
        window.open(data['rowData'].lnk_impresion, '_blank');
      }
    }
  }

  pageChange(paginationData: object) {

    this.filterModel['p_nropag'] = paginationData['pageIndex'],
      this.filterModel['p_regxpag'] = paginationData['pageSize'];
    console.log('pageChange');

    this.findTable(false);
  }

  private findTable(notifyTable: boolean = false) {
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);
    this.aseguradoService.getAseguradosLavadoActivo(this.filterModel, true).subscribe((data: object) => {

      console.log('response api get', data);
      this.filterToolbarService.saveReportResults(data['result']);
      if (data) {
        this.listItems = new MatTableDataSource(data['result']);
        console.log(this.listItems);
        this.resultLength = data['pagination'].totalItems;
        if (data['result'].length > 0) {
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          // this.excelLink = data['p_lnk_excel'];
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
          // this.excelLink = null;
        }
      }
      if (notifyTable) {
        this.applyFilterInTable.next(0);
      }
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);

    },
      error => {
        console.error(error);
        this.filterToolbarService.saveReportResults([]);
        this.isLoadingResults = false;

        this.uiService.loadingDataTable(false);
      });
  }
}
