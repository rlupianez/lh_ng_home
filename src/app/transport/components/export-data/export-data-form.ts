import { Validators } from '@angular/forms';
import { ExportFieldEnum } from './export-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [ExportFieldEnum.origin]: {
    label: 'Origen',
    control: {
      type: 'select',
      path: '/listas/LIST_PROVINCIAS',
      options: {
        value: 'descri',
        key: 'cod_jur'
      },
      pasteFieldOnSelect: 'cod_jur',
      hasEmptyOption: true
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.destination]: {
    label: 'Destino',
    control: {
      type: 'select',
      path: '/listas/LIST_PROVINCIAS',
      options: {
        value: 'descri',
        key: 'cod_jur'
      },
      pasteFieldOnSelect: 'cod_jur',
      hasEmptyOption: true
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.from]: {
    label: 'Desde',
    control: {
      type: 'text'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.to]: {
    label: 'Hasta',
    control: {
      type: 'text'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.incoterm]: {
    label: 'Incoterm',
    control: {
      type: 'select',
      path: '/listas/LIST_INCOTERM',
      options: {
        value: 'desc_incoterm',
        key: 'cod_incoterm'
      },
      pasteFieldOnSelect: 'desc_incoterm'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },

  [ExportFieldEnum.incoterm]: {
    label: 'Incoterm',
    control: {
      type: 'select',
      path: '/listas/LIST_INCOTERM',
      options: {
        value: 'desc_incoterm',
        key: 'cod_incoterm'
      },
      pasteFieldOnSelect: 'desc_incoterm'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.valueInvoice]: {
    label: 'Valor Factura',
    disabled: true,
    control: {
      type: 'number',
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },
  [ExportFieldEnum.creditLetter]: {
    label: 'Carta de Crédito 10%',
    control: {
      type: 'select',
      //path: '/listas/LIST_PCT_CARTA_CR',
      list: [
        {
          value: '100',
          key: '1'
        },
        {
          value: '200',
          key: '2'
        },
      ] ,
      options: {
        value: 'desc_pct_carta_cr',
        key: 'cod_pct_carta_cr'
      },
      pasteFieldOnSelect: 'desc_pct_carta_cr'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ExportFieldEnum.assuredSum]: {
    label: 'Suma Asegurada',
    control: {
      type: 'number',
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  }

}
//
export const group = {
  title: 'DatosRiesgo',
  icon: 'assignment_ind',
  content: '',
  expanded: true,
  children: fields

}


/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
  [ExportFieldEnum.origin]: { hidden: false, disabled: false },
  [ExportFieldEnum.destination]: { hidden: false, disabled: false },
  [ExportFieldEnum.from]: { hidden: false, disabled: false },
  [ExportFieldEnum.to]: { hidden: false, disabled: false },
  [ExportFieldEnum.incoterm]: { hidden: false, disabled: false },
  [ExportFieldEnum.valueInvoice]: { hidden: false, disabled: false },
  [ExportFieldEnum.creditLetter]: { hidden: false, disabled: false },
  [ExportFieldEnum.assuredSum]: { hidden: false, disabled: true },
}

export const viewFields = {

}

