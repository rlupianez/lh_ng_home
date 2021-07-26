import {
  Component, OnInit, Input, Output, AfterViewInit, ViewChild,
  OnChanges, EventEmitter, Directive, ElementRef, OnDestroy, ViewEncapsulation
} from '@angular/core';

import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

/**
 *  
 *  Componente encargado de renderizar tabla con un listado de datos
 * 
 */

@Component({
  selector: 'app-accordion-custom',
  templateUrl: './accordion-custom.component.html',
  styleUrls: ['./accordion-custom.component.scss'],
  animations: [
    trigger('fadeIn', animations.SkeletonfadeIn()),
    trigger('rowsAnimation', animations.rowsSlideAnimation())
  ],
  exportAs: 'appAccordionCustom',
  encapsulation: ViewEncapsulation.None
})
export class AccordionCustomComponent implements OnInit {

  /**
   * Titulo de la tabla
   */
  @Input() title?: string = 'Resultados de Búsqueda';

  /**
   * Listado de columnas a mostrar
   */
  @Input() columns: {};

  @Input() accordion;

  @Input() formGroup;

  @Input() disabled: boolean = false;
  /**
   * Flag para indicar si se han terminado de cargos los datos del componente
   */
  @Input() isLoading: boolean;

  /**
   * Evento que emite el dynamic field, deberia ser blur
   */
  @Output() onChange: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento que emite el dynamic field, deberia ser blur
   */
  @Output() onSubmitForm: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento que se emite cuando se hace click en el borrar link de la fila
   */
  @Output() onClickDelete: EventEmitter<object> = new EventEmitter<object>();

  @Output() actionEvent: EventEmitter<object> = new EventEmitter<object>();

  @Output() clickRowEvent: EventEmitter<object> = new EventEmitter<object>();

  @Output() clickCheckboxEvent: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(MatExpansionPanel) accordionCustom: MatExpansionPanel;

  constructor() {

  }

  ngOnInit() {
    if (this.disabled) {
      this.accordion.disabled = true;
    }
  }

  panelOpened(event) {
    this.actionEvent.emit({
      data: event
    });
    this.accordion.expanded = true;
  }

  closeAccordion() {
    this.accordion.expanded = false;
  }

  clickRow(event, row: any) {
    this.clickRowEvent.emit({
      event: event,
      row: row
    });
  }

  onChangeCheckbox(event) {
    this.clickCheckboxEvent.emit({
      event: event
    });
  }

  open() {
    this.accordionCustom.open();
  }

  buttonClick() {
    this.onSubmitForm.emit();
  }

  /**
   * Para un datepicker el dateChange se ejecuta on blur y cuando cambiar desde el datepicker.
   * 
   * @param event Evento blur
   * @param name Como se llama el campo de la lista
   * @param rowData El valor que identifica el campo de la lista
   */
  onFocusOut(event: Event, name: string, rowData: object, rowIndex: number, fieldIndex: number) {

    this.onChange.emit({
      event: event,
      name: name,
      rowData: rowData,
      rowIndex: rowIndex,
      fieldIndex: fieldIndex
    });
  }

  /**
   * Cuando se hace click en el icono de borrar el link.
   * 
   * @param event Evento Click
   * @param rowData Los datos de la fila
   * @param fileData Cuando la fila hay mas de un archivo, le paso el objecto que representa ese archivo
   */
  onClickDeleteLink(event: Event, rowData: object, fileData?: object) {

    event.preventDefault();

    this.onClickDelete.emit({
      event: event,
      rowData: rowData,
      fileData: fileData
    });
  }
}
