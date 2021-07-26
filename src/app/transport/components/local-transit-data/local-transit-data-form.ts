import { Validators } from '@angular/forms';
import { LocalTransitFieldEnum } from './local-transit-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [LocalTransitFieldEnum.origin]: {
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
  [LocalTransitFieldEnum.destination]: {
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
  [LocalTransitFieldEnum.from]: {
    label: 'Desde',
    control: {
      type: 'text'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [LocalTransitFieldEnum.to]: {
    label: 'Hasta',
    control: {
      type: 'text'
    },
    class: 'col-3 col-sm-3 col-md-3 col-lg-3',
  },
  [LocalTransitFieldEnum.assuredSum]: {
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
  [LocalTransitFieldEnum.origin]: { hidden: false, disabled: false },
  [LocalTransitFieldEnum.destination]: { hidden: false, disabled: false },
  [LocalTransitFieldEnum.from]: { hidden: false, disabled: false },
  [LocalTransitFieldEnum.to]: { hidden: false, disabled: false },
  [LocalTransitFieldEnum.assuredSum]: { hidden: false, disabled: false },
}

export const viewFields = {

}

