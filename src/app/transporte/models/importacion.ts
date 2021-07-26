import { Validators } from '@angular/forms';
import * as moment from 'moment';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {    
    p_origen: {
        label: 'Origen',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_NACIONALIDADES',
          options: {
              value: 'x_pais',
              key: 'cod_pais' 
          },
          pasteFieldOnSelect: 'x_pais'
      },
          class: 'col-sm-4 col-md-4 col-lg-4',
          // required: true        
    },
      p_destino: {
        label: 'Destino',
        control: { 
          type: 'select',
          searchable: true,
          // appearance: 'standard',
          path: '/listas/LIST_NACIONALIDADES',
          options: {
              value: 'x_pais',
              key: 'cod_pais' 
          },
          pasteFieldOnSelect: 'x_pais'
      },
          class: 'col-sm-4 col-md-4 col-lg-4',
          // required: true        
    },
  p_incoterm: {
    label: 'Incoterm',
    control: { 
      type: 'select',
      searchable: true,
      // appearance: 'standard',
      path: '/listas/LIST_INCOTERM',
      options: {
          value: 'desc_incoterm',
          key: 'cod_incoterm' 
      },
      pasteFieldOnSelect: 'desc_incoterm'
  },
    class: 'col-sm-4 col-md-4 col-lg-3',
    // required: true
  },
  p_valor_factura: {
    label: 'Valor Factura',
    disabled: true,
    control: {
        type: 'number',
        // appearance: 'standard'
    },
    class: 'col-sm-12 col-md-3 col-lg-3',
    validators: [
        'required'
    ] 
    // class: 'col-sm-12 col-md-3 col-lg-3',
  },
  p_suma_extra: {
    label: 'Suma extra en concepto de Gravamenees,Fletes,Gastos',
    control: { 
      type: 'select',
      searchable: true,
      // appearance: 'standard',
      path: '/listas/LIST_PCT_GASTOS',
      options: {
          value: 'desc_pct_gastos',
          key: 'cod_pct_gastos' 
      },
      pasteFieldOnSelect: 'desc_pct_gastos'
  },
    class: 'col-sm-4 col-md-4 col-lg-3',
    // required: true
  },
  p_benef_imaginario: {
    label: 'Beneficio Imaginario',
    control: { 
      type: 'select',
      searchable: true,
      // appearance: 'standard',
      path: '/listas/LIST_PCT_BENEF',
      options: {
          value: 'desc_pct_benef',
          key: 'cod_pct_benef' 
      },
      pasteFieldOnSelect: 'desc_pct_benef'
  },
    class: 'col-sm-4 col-md-4 col-lg-3',
    // required: true
  },
  p_suma_asegurada: {
    label: 'Suma Asegurada',
    disabled: true,
    control: {
        type: 'number',
        // appearance: 'standard'
    },
    class: 'col-sm-12 col-md-3 col-lg-3',
    validators: [
        'required'
    ] 
    // class: 'col-sm-12 col-md-3 col-lg-3',
  }
}
 
export const group = {
    title: 'Importacion',
    icon: 'assignment_ind',
    content: '',
    expanded: true, 
    children: fields

}


/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
  p_origen: { hidden: false, disabled: false }, 
  p_destino: { hidden: false, disabled: false },
  p_desde: { hidden: false, disabled: false },
  p_hasta: { hidden: false, disabled: false },
  p_incoterm: { hidden: false, disabled: false },
  p_valor_factura: { hidden: false, disabled: false },
  p_suma_extra: { hidden: false, disabled: false },
  p_benef_imaginario: { hidden: false, disabled: false },
  p_suma_asegurada: { hidden: false, disabled: false }

}
