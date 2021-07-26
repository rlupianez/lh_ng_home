import { Validators } from '@angular/forms';
import { ImportFieldEnum } from './import-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [ImportFieldEnum.origin]: {
    label: 'Origen',
    control: {
      type: 'select',
      path: '/listas/LIST_NACIONALIDADES',
      options: {
        value: 'x_pais',
        key: 'cod_pais'
      },
      pasteFieldOnSelect: 'x_pais'
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
  },
  [ImportFieldEnum.destination]: {
    label: 'Destino',
    control: {
      type: 'select',
      path: '/listas/LIST_NACIONALIDADES',
      options: {
        value: 'x_pais',
        key: 'cod_pais'
      },
      pasteFieldOnSelect: 'x_pais'
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
  },
  [ImportFieldEnum.incoterm]: {
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
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
  },
  [ImportFieldEnum.valueInvoice]: {
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
  [ImportFieldEnum.extraSum]: {
    label: 'Suma extra en concepto de gravámenes y Flete',
    control: {
      type: 'select',
      path: '/listas/LIST_PCT_GASTOS',
      options: {
        value: 'desc_pct_gastos',
        key: 'cod_pct_gastos'
      },
      pasteFieldOnSelect: 'desc_pct_gastos'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ImportFieldEnum.profitImaginary]: {
    label: 'Beneficio Imaginario',
    control: {
      type: 'select',
      path: '/listas/LIST_PCT_BENEF',
      options: {
        value: 'desc_pct_benef',
        key: 'cod_pct_benef'
      },
      pasteFieldOnSelect: 'desc_pct_benef'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [ImportFieldEnum.assuredSum]: {
    label: 'Suma Asegurada',
    disabled: true,
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
  [ImportFieldEnum.origin]: { hidden: false, disabled: false },
  [ImportFieldEnum.destination]: { hidden: false, disabled: false },
  [ImportFieldEnum.incoterm]: { hidden: false, disabled: false },
  [ImportFieldEnum.valueInvoice]: { hidden: false, disabled: false },
  [ImportFieldEnum.extraSum]: { hidden: false, disabled: false },
  [ImportFieldEnum.profitImaginary]: { hidden: false, disabled: false },
  [ImportFieldEnum.assuredSum]: { hidden: false, disabled: false },
}

export const viewFields = {

}

