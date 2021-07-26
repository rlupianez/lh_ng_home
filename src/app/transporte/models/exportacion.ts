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
  p_destino:  {
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
      p_desde:  {
        label: 'Desde',
        disabled: false,
        hidden: false,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    p_hasta:  {
      label: 'Hasta',
      disabled: false,
      hidden: false,
      control: { 
          type: 'text'
      },
      class: 'col-sm-12 col-md-3 col-lg-3'
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
  p_carta_credito: {
    label: 'Carta de Credito 10%',
    control: { 
      type: 'select',
      searchable: true,
      // appearance: 'standard',
      path: '/listas/LIST_PCT_CARTA_CR',
      options: {
          value: 'desc_pct_carta_cr',
          key: 'cod_pct_carta_cr' 
      },
      pasteFieldOnSelect: 'desc_pct_carta_cr'
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
    title: 'Exportacion',
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
  p_carta_credito: { hidden: false, disabled: false },
  p_suma_asegurada: { hidden: false, disabled: false }

}
