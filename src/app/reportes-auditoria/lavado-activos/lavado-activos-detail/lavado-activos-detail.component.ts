import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AseguradoDetail, DatosGeneralesConsumidorFinal, AccordionSeccion, AccordionPoliza, AccordionDocumentacion, AccordionAnalisis, AccordionObservacion } from './lavado-activos-detail.config';
import { AseguradoBasicoService } from '../../../asegurados/asegurado-basico/asegurado-basico.service';
import { Location } from '@angular/common';

import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from '@core/services/ui.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { Subject } from 'rxjs';
import { IAccordion } from '@shared/ui-components/material-table/material-table.interfaces';
import { DatosProductorService } from '../datos-productor/datos-productor.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { MatSelectChange } from '@angular/material/select';
import { ToasterService } from '@core/services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialogConfirm/dialog-confirm.component';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-lavado-activos-detail',
  templateUrl: './lavado-activos-detail.component.html',
  styleUrls: ['./lavado-activos-detail.component.scss'],
  animations: [trigger('fadeIn', animations.SkeletonfadeIn())]
})
export class LavadoActivosDetailComponent implements OnInit {

  data: object = {};
  codAsegurado: string = null;
  detailConfig = AseguradoDetail;
  datosConsumidorFinal = DatosGeneralesConsumidorFinal;
  loading: boolean = false;
  loadingAsegurado: boolean = true;
  loadingProductor: boolean = true;
  columns: any;
  tablePageSize: number = 25;
  resultLength: number = 0;
  listItems: MatTableDataSource<unknown>;
  isLoadingResults: boolean = false;
  applyFilterInTable: Subject<number> = new Subject<number>();
  accordionSeccion: IAccordion = AccordionSeccion;
  accordionPoliza: IAccordion = AccordionPoliza;
  accordionDocumentacion: IAccordion = AccordionDocumentacion;
  accordionAnalisis: IAccordion = AccordionAnalisis;
  accordionObservaciones: IAccordion = AccordionObservacion;
  formGroup: FormGroup[] = [];

  /**
   * Observer que notifica si los campos de filtros han sido modificados.
   * Sirve para identificar si lo que se esta mostrando en la tabla corresponde a los filtros en pantalla.
   */
  filtersHasChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private uiService: UiService,
    private router: Router,
    private aseguradoService: AseguradoBasicoService,
    private productorService: DatosProductorService,
    private filterToolbarService: FilterToolbarService,
    private formsFactoryService: FormsFactoryService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private location: Location,
    private navService: NavigationService,
    private dialogo: MatDialog) {

    this.listItems = new MatTableDataSource();
    this.isLoadingResults = true;

    this.uiService.loadingDataTable(true);
    this.route.params.subscribe(params => {

      this.codAsegurado = params.id;

      const state = this.router.getCurrentNavigation().extras.state;

      this.accordionPoliza.data = new MatTableDataSource([]);
      this.accordionDocumentacion.data = new MatTableDataSource([]);
      if (state && state.data) {
        console.log('cargando estado anterior');
        this.loading = true;
        this.data = state.data;
        this.setDatosGenerales();
        this.loading = false;
        this.loadingAsegurado = false;
        this.loadingProductor = false;

        this.cargarDatosProd(this.data['cod_prod']);

      } else if (params.id) {
        this.loadingAsegurado = true;
        this.aseguradoService.getAseguradoLavadoActivo(params.id).subscribe(data => {
          console.log('Datos Asegurado', data);
          if (data && data['result'].length > 0) {
            // TODO: esto  es horrible, todo esta en data
            this.data = { ...this.data, ...data['result'][0] };
            console.log(this.data['suficiente']);
            this.accordionDocumentacion.headerCheckboxValue = this.data['suficiente'] == 'SI' ? true : false;
            this.accordionAnalisis.input[0].control.defaultValue = this.data['analisis'];
            this.accordionObservaciones.input[0].control.defaultValue = this.data['observaciones'];
            this.setDatosGenerales();
            this.loadingAsegurado = false;
            this.cargarDatosProd(data['result'][0].cod_prod);
          }
        },
          error => {
            this.loadingAsegurado = false;
          });

      }
    });

    this.accordionDocumentacion.loading = true;
    this.aseguradoService.getDocumentacionLavado(this.codAsegurado).subscribe((data: object) => {
      console.log('Data documentacion ', data);
      this.accordionDocumentacion.data = new MatTableDataSource(data['result']);
      this.getFormGroupControl();

      this.accordionDocumentacion.loading = false;
      this.accordionDocumentacion.disabled = false;

      data['result'].forEach((documentacion, key) => {

        if (data['result'] && data['result'][key] && data['result'][key]['editable'] == "0") {
          // Se setea no editables todos los campos menos el cargar documento y documentos
          for (var i = 0; i <= 5; i++) {
            this.accordionDocumentacion.list[i]['editable'] = false;
          }
        }

        // Busco los archivos de cada documentacion, cada documentacion puede tener mas de un archivo tambien
        this.aseguradoService.getDocumentacionDocumentos(this.codAsegurado, documentacion.cod_documentacion).subscribe((data: object) => {
          console.log('Data documentos archivos ', data);
          this.accordionDocumentacion.data.data[key]['documentos'] = data['result'];
          this.accordionDocumentacion.loading = false;
          this.accordionDocumentacion.disabled = false;
        })
      });

    });

  }

  cargarDatosProd(cod_prod) {
    this.loadingProductor = true;
    this.productorService.getDatoProductor(cod_prod).subscribe(data => {
      console.log('Datos Productor', data);

      if (data && data['result'].length > 0) {
        Object.entries(data['result'][0]).forEach(([key, value]) => {
          // agrego un prefijo porque sino se mezclan las key con los datos de asegurado
          this.data['prod_' + key] = value;
        });
        // TODO: tenemos que tener un loading por cada grupo de campos
      }
      this.loadingProductor = false;
    },
      error => {
        this.loadingProductor = false;
      });
  }

  ngOnInit() {
  }

  accordionSeccionOpened($event) {
    this.accordionSeccion.loading = true;
    this.aseguradoService.getAseguradosSecLavado(this.codAsegurado).subscribe((data: object) => {
      if (data) {
        this.accordionSeccion.data = new MatTableDataSource(data['result']);
        console.log(this.accordionSeccion.data);
      }
      this.accordionSeccion.loading = false;
    },
      error => {
        console.error(error);
        //this.filterToolbarService.saveReportResults([]);
        this.accordionSeccion.loading = false;
      });
  }

  /**
   * Seteo los campos con la respuesta del WS y preparación de input
   */
  getFormGroupControl() {
    this.accordionDocumentacion.data.data.map((row: any, index) => {

      var filters = this.accordionDocumentacion.list;
      this.accordionDocumentacion.list.map((filter, filterIndex) => {
        if (filter.name && row[filter.name] != '') {
          filters[filterIndex].control.defaultValue = row[filter.name];
        }
      });

      this.formGroup[index] = this.formBuilder.group(this.formsFactoryService.generateForm(filters, {}));
      //this.formGroup[index].patchValue(value);
    });
  }

  private crearFormGroup(accordionConfig: IAccordion) {
    accordionConfig.formGroup = this.formBuilder.group(this.formsFactoryService.generateForm(accordionConfig.input, {}));
    accordionConfig.loading = false;
    accordionConfig.disabled = false;

  }

  accordionSeccionClick($event, idAccordionPoliza, idAccordionDocumentacion, idAccordionAnalisis) {
    this.accordionPoliza.loading = true;

    idAccordionPoliza.open();

    this.crearFormGroup(this.accordionAnalisis);
    this.crearFormGroup(this.accordionObservaciones);

    this.aseguradoService.getAseguradosPoliza(this.codAsegurado, $event.row.cod_seccion).subscribe((data: object) => {
      if (data) {
        this.accordionPoliza.data = new MatTableDataSource(data['result']);
        console.log(this.accordionPoliza.data);
      }
      this.accordionPoliza.loading = false;
      this.accordionPoliza.disabled = false;
    },
      error => {
        console.error(error);
        //this.filterToolbarService.saveReportResults([]);
        this.accordionPoliza.loading = false;
      });
  }

  accordionPolizaClick($event) {
    this.navService.navigateToPage(
      {
        baseUrl: '/reportes',
        modulePath: '/reportes-productores',
        pagePath: '/poliza-cartera/' + $event.row.poliza + '/' + $event.row.cod_seccion + '/0/0/'
      }
    );
  }

  accordionDocumentacionCheckboxClick($event) {
    console.log($event.event.checked);
    this.aseguradoService.updateAseguradoDocSuficiente(this.codAsegurado, 'p_suficiente', $event.event.checked).subscribe((data: object) => {
      console.log(data);
      if (data) {
        this.toasterService.show('Documentación suficiente guardada', 'success');
      }
    },
      error => {
        this.toasterService.show('No se pudo guarda la documentación suficiente', 'error');
        console.error(error);
      });
  }

  backRoute() {
    this.location.back();
  }

  setDatosGenerales() {
    if (this.data['desc_condicion_fiscal'] === 'CONS. FINAL') {
      this.detailConfig['datos_generales'] = { ...this.datosConsumidorFinal } as any;
    } else {
      //TODO: ver que hay dos formas de mostrar el detalle
      //this.detailConfig['datos_generales'] = { ...this.datosNoConsumidorFinal } as any;
    }
    this.detailConfig['datos_generales'] = { ...this.datosConsumidorFinal } as any;
  }

  get initialLoading() {
    return this.loading;
  }

  loadingForm(formName: string) {

    if (formName === 'datos_productor') {
      return this.loadingProductor;
    }
    if (formName === 'datos_generales' || formName === 'matriz_riesgo' || formName === 'datos_fiscales') {
      return this.loadingAsegurado;
    }

    return this.loading;
  }

  /**
   * Se ejecuta cuando el acordion emite el blur de un campo dinamico
   * 
   * @param event Evento blur de dynamic Field. Tiene que tener el event, name, keyValue
   */
  onDocumentacionChange(event) {

    const input = (event.event.target as HTMLInputElement);
    console.log(event.name, event.rowData);
    if (input && input.files) {
      if (!input.files.length) {
        // pasa cuando no selecciono un archivo pero quizo hacerlo
        console.log('no selecciono un archivo');
        return;
      }
      //TODO: setear a vacio el input para el proximo change
      this.accordionDocumentacion.loadingChanges = true;
      this.aseguradoService.postSaveDocumentacion(event.rowData, input).subscribe((data: object) => {
        if (data) {
          // TODO: manejar la respuesta
          console.log(data);
        }
        input.value = '';
        this.getListFileByDocumentacion(event);
      },
        error => {
          this.accordionDocumentacion.loadingChanges = false;
          input.value = '';
          console.error(error);

        });
    } else {
      let value = null;
      //Esto lo hacemos porque los select de material tienen un evento distinto al resto de los input
      if (event.event instanceof MatSelectChange) {
        value = event.event.value
      } else {
        value = (event.event.target as HTMLInputElement).value
      }

      //TODO: En el evento viene el value actual y el previousVaue, tendríamos que hacer rollback en el error
      this.accordionDocumentacion.loadingChanges = true;
      this.aseguradoService.patchDocumentacion(event.rowData, event.name, value).subscribe((data: object) => {
        if (data) {
          // TODO: manejar la respuesta
          console.log(data);
        }

        this.accordionDocumentacion.loadingChanges = false;
      },
        error => {
          this.accordionDocumentacion.loadingChanges = false;
          this.formGroup[event.rowIndex].controls[event.fieldIndex].patchValue(event.event.previousValue);
          console.log("previous value ", event.event.previousValue);
          console.error(error);
        });
    }

  }

  /**
   * Se ejecuta cuando el acordion emite el blur de un campo dinamico del campo analisis
   * 
   * @param event Evento blur de dynamic Field. Tiene que tener el event, name, keyValue
   */
  onAnalisisSubmit() {
    this.enviarFormulario(this.accordionAnalisis, 'p_analisis');
  }

  /**
   * Se ejecuta cuando el acordion emite el blur de un campo dinamico del campo observaciones
   * 
   * @param event Evento blur de dynamic Field. Tiene que tener el event, name, keyValue
   */
  onObservacionesSubmit() {
    this.enviarFormulario(this.accordionObservaciones, 'p_observaciones');
  }

  private enviarFormulario(accordionConfig: IAccordion, field: string) {
    let input = accordionConfig.formGroup.controls[0];
    if (input) {
      input = input.value;
    }
    accordionConfig.loadingChanges = true;
    this.aseguradoService.updateAseguradoDocSuficiente(this.codAsegurado, field, input).subscribe((data: object) => {
      if (data) {
        console.log(data);
      }
      this.toasterService.show('Guardado correctamente', 'success');
      accordionConfig.loadingChanges = false;
    },
      error => {
        accordionConfig.loadingChanges = false;
        this.toasterService.show('Error al guardar', 'error');
        console.error(error);
      });
  }


  private getListFileByDocumentacion(event: any) {
    var indexData = this.accordionDocumentacion.data.data.findIndex((element: any) => {
      if (element.cod_documentacion == event.rowData.cod_documentacion)
        return true;
    });

    // Busco los archivos de la documentacion
    this.aseguradoService.getDocumentacionDocumentos(this.codAsegurado, event.rowData.cod_documentacion).subscribe((data: object) => {
      this.accordionDocumentacion.loadingChanges = false;
      console.log('Data archivo documentos !! ', data);
      this.accordionDocumentacion.data.data[indexData]['documentos'] = data['result'];
    });
  }

  /**
   * Se ejecuta cuando se hace click en borrar documento
   * 
   * @param event Evento blur de dynamic Field. Tiene que tener el event, name, keyValue
   */
  onClickDeleteDocument(event) {
    this.dialogo
      .open(DialogConfirmComponent, {
        data: "Seguro que desea eliminar " + event.fileData['desc_archivo'] + '.' + event.fileData['tipo_archivo'] + '?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log(event.rowData);
          //TODO: setear a vacio el input para el proximo change
          this.accordionDocumentacion.loadingChanges = true;
          this.aseguradoService.postDeleteDocumentacion(event.rowData, event.fileData).subscribe((data: object) => {
            if (data) {
              // TODO: manejar la respuesta
              console.log(data);
            }

            this.getListFileByDocumentacion(event);
          },
            error => {
              this.accordionDocumentacion.loadingChanges = false;
              console.error(error);
            });
        } else {
        }
      });
  }
}
