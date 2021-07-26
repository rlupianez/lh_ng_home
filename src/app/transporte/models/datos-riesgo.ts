import { Validators } from '@angular/forms';
import * as moment from 'moment';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {    
    tomador: {
        label: 'El tomador es',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_TIPOS_TOMADOR_TR',
          options: {
              value: 'desc_tipo_tomador',
              key: 'cod_tipo_tomador'
          },
          pasteFieldOnSelect: 'desc_tipo_tomador'
      },
        class: 'col-sm-12 col-md-12 col-lg-3',
        // required: true
      },
    p_clase_mercaderia: {
        label: 'Clase de Mercaderia',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_CLASES_MERCADERIA',
          options: {
              value: 'desc_clase_merc',
              key: 'cod_clase_merc' 
          },
          pasteFieldOnSelect: 'desc_clase_merc'
      },
        class: 'col-sm-4 col-md-4 col-lg-3',
        // required: true
      },
      p_tipo_mercaderia: {
        label: 'Tipo de Mercaderia',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_TIPOS_MERCADERIA_TR',
          options: {
              value: 'desc_tipo_mercaderia',
              key: 'cod_tipo_mercaderia' 
          },
          pasteFieldOnSelect: 'desc_tipo_mercaderia'
      },
        class: 'col-sm-4 col-md-4 col-lg-3',
        // required: true
    },
    p_desc_mercaderia: {
      label: 'Descripcion de la Mercaderia',
      control: {
          type: 'text'
      },
      class: 'col-sm-12 col-md-12 col-lg-4',
      validators: [
          'required'
      ]
  },
    p_tipo_transito: {
        label: 'Tipo Tránsito',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_TIPOS_TRANSITO',
          options: {
              value: 'desc_tipo_transito',
              key: 'cod_tipo_transito' 
          },
          pasteFieldOnSelect: 'cod_tipo_transito'
        },
        required: true,
        class: 'col-sm-4 col-md-4 col-lg-3',
        // required: true
      },
      p_certificado_eximicion: {
        label: 'La mercaderia se transporta en vehiculos de terceros respecto del propietario de la misma?:',
        control: {
            type: 'slide',
            defaultValue: false
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    },
    p_via: {
        label: 'Via',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
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
    p_via_terrestre: {
        label: 'Via Terrestre',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
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
    p_moneda: {
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
          class: 'col-sm-12 col-md-12 col-lg-4',
          // required: true        
    }

}

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
    tomador: { hidden: false, disabled: false }, 
    p_clase_mercaderia: { hidden: false, disabled: false },
    p_tipo_mercaderia: { hidden: false, disabled: false },
    p_desc_mercaderia: { hidden: false, disabled: false },
    p_tipo_transito: { hidden: false, disabled: false },
    p_certificado_eximicion: { hidden: true, disabled: false },
    p_via: { hidden: false, disabled: false },
    p_via_terrestre: { hidden: true, disabled: false },
    p_moneda: { hidden: false, disabled: false }

}

export const viewFields = {
  tomador: { hidden: false, disabled: false }, 
  p_clase_mercaderia: { hidden: false, disabled: false },
  p_tipo_mercaderia: { hidden: false, disabled: false },
  p_desc_mercaderia: { hidden: false, disabled: false },
  p_tipo_transito: { hidden: false, disabled: false },
  p_certificado_eximicion: { hidden: true, disabled: false },
  p_via: { hidden: false, disabled: false },
  p_via_terrestre: { hidden: true, disabled: false },
  p_moneda: { hidden: false, disabled: false }

}

