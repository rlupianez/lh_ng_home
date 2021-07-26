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
          list: [
            { key: 'A', value: 'CABA' },
            { key: 'B', value: 'GBA NORTE' },
            { key: 'B', value: 'CORDOBA' }
          ],
          options: {
            value: 'value',
            key: 'key'
          },
          pasteFieldOnSelect: 'key',
          hasEmptyOption: false
        },
        class: 'col-sm-4 col-md-4 col-lg-3',
        // required: true
      },
      p_destino: {
        label: 'Origen',
        control: {
          type: 'select',
          list: [
            { key: 'A', value: 'CABA' },
            { key: 'B', value: 'GBA NORTE' },
            { key: 'B', value: 'CORDOBA' }
          ],
          options: {
            value: 'value',
            key: 'key'
          },
          pasteFieldOnSelect: 'key',
          hasEmptyOption: false
        },
        class: 'col-sm-4 col-md-4 col-lg-3',
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
  p_suma_asegurada: {
    label: 'Suma Asegurada',
    disabled: true,
    control: {
        type: 'number',
        // appearance: 'standard'
    },
    class: 'col-sm-12 col-md-3 col-lg-4',
    validators: [
        'required'
    ] 
    // class: 'col-sm-12 col-md-3 col-lg-3',
  }
}

export const group = {
    title: 'TransitoLocal',
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
  p_suma_asegurada: { hidden: false, disabled: false }

}
