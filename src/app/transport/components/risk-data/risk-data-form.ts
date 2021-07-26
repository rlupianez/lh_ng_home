import { Validators } from '@angular/forms';
import { RiskFieldEnum } from './risk-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [RiskFieldEnum.taker]: {
    label: 'El tomador es',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_TOMADOR_TR',
      options: {
        value: 'desc_tipo_tomador',
        key: 'cod_tipo_tomador'
      },
      pasteFieldOnSelect: 'desc_tipo_tomador'
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    // required: true
  },
  p_clase_mercaderia: {
    label: 'Clase de Mercadería',
    control: {
      type: 'select',
      path: '/listas/LIST_CLASES_MERCADERIA',
      options: {
        value: 'desc_clase_merc',
        key: 'cod_clase_merc'
      },
      pasteFieldOnSelect: 'desc_clase_merc'
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    // required: true
  },
  [RiskFieldEnum.merchandiseType]: {
    label: 'Tipo de Mercaderia',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_MERCADERIA_TR',
      options: {
        value: 'desc_tipo_mercaderia',
        key: 'cod_tipo_mercaderia'
      },
      pasteFieldOnSelect: 'desc_tipo_mercaderia'
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    // required: true
  },
  [RiskFieldEnum.merchandiseDescription]: {
    label: 'Descripción de la Mercadería',
    control: {
      type: 'textArea',
      cols: 10,
      rows: 3
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },
  [RiskFieldEnum.trafficType]: {
    label: 'Tipo Tránsito',
    control: {
      type: 'select',
      //path: '/listas/LIST_TIPOS_TRANSITO',
      options: {
        value: 'desc_tipo_transito',
        key: 'cod_tipo_transito'
      },
      list: [
        { key: '1', value: '1' },
        { key: '2', value: '2' },
        { key: '3', value: '3' },
      ],
      pasteFieldOnSelect: 'cod_tipo_transito'
    },
    required: true,
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    // required: true
  },
  [RiskFieldEnum.exemptionCertificate]: {
    label: '¿La mercadería se transporta en vehículos de terceros respecto del propietario de la misma?:',
    control: {
      type: 'slide',
      defaultValue: false
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12'
  },
  [RiskFieldEnum.via]: {
    label: 'Vía',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_VIA_TR',
      options: {
        value: 'desc_via',
        key: 'cod_via'
      },
      pasteFieldOnSelect: 'cod_via'
    },
    class: 'col-sm-4 col-md-4 col-lg-4',
    // required: true        
  },
  [RiskFieldEnum.transportType]: {
    label: 'Tipo de Transporte',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_VIA_TERRESTRE',
      options: {
        value: 'desc_via_terrestre',
        key: 'cod_via_terrestre'
      },
      pasteFieldOnSelect: 'desc_via_terrestre'
    },
    class: 'col-sm-4 col-md-4 col-lg-4',
    // required: true        
  },
  [RiskFieldEnum.moneyType]: {
    label: 'Moneda',
    control: {
      type: 'select',
      list: [
        { key: 'P', value: 'Pesos' },
        { key: 'D', value: 'Dolares' }
      ],
      options: {
        value: 'value',
        key: 'key'
      },
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false
    },
    class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    // required: true        
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

{"p_x_error":null,"p_error":null,"p_list_tipos_transito":[{"cod_tipo_transito":"1","desc_tipo_transito":"Exportación"},{"cod_tipo_transito":"2","desc_tipo_transito":"Importación"},{"cod_tipo_transito":"3","desc_tipo_transito":"Transito interno"}]}
*/

/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
  [RiskFieldEnum.taker]: { hidden: false, disabled: false },
  [RiskFieldEnum.merchandiseKind]: { hidden: false, disabled: false },
  [RiskFieldEnum.merchandiseType]: { hidden: false, disabled: false },
  [RiskFieldEnum.merchandiseDescription]: { hidden: false, disabled: false },
  [RiskFieldEnum.trafficType]: { hidden: false, disabled: false },
  [RiskFieldEnum.exemptionCertificate]: { hidden: false, disabled: false },
  [RiskFieldEnum.via]: { hidden: false, disabled: false },
  [RiskFieldEnum.transportType]: { hidden: false, disabled: false },
  [RiskFieldEnum.moneyType]: { hidden: false, disabled: false }
}

export const viewFields = {

}

