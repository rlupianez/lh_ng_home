import * as moment from 'moment';
import { Validators } from '@angular/forms';


export interface ColumnItem {
    label: string;
    visible: boolean;
    class: string;
    icon?: string;
}

export let columns = {
  // select : { label: 'Select', class: 'col' },
  x_productor: { label: 'Productor', visible: true, class: 'col', cellStyle: 'text-left' },
  x_organizador: { label: 'Organizador', visible: true, class: 'col', cellStyle: 'text-left' },
  cod_sec: { label: 'Sección', visible: true, class: 'col', suffix: 'x_descripcion', cellStyle: 'text-left' },
  poliza: { label: 'Póliza', visible: true, class: 'col' },
  poliza_link: { type: 'link', label: '', visible: true, class: 'col', icon: 'group', tooltip: 'Ver Póliza' },
  o_siniestro: { label: 'Siniestro', visible: true, class: 'col' },
  cod_asegu: { label: 'Asegurado', visible: true, class: 'col', cellStyle: 'text-left', suffix: 'x_asegurado' },
  asegurado_link: { type: 'link', label: '', visible: true, class: 'col', icon: 'cobertura_poliza', tooltip: 'Ver Asegurado' },
  fec_denuncia: { label: 'Fecha', visible: true, class: 'col' },
  x_estado: { label: 'Estado', visible: true, class: 'col', cellStyle: 'text-left' },
  tipo_denuncia: { label: 'Tipo Denuncia', visible: true, class: 'col', cellStyle: 'text-left' },
  tramitador: { label: 'Tramitador', visible: true, class: 'col', cellStyle: 'text-left' },
  sucursal: { label: 'Sucursal', visible: true, class: 'col',  cellStyle: 'text-left' }
}
  export interface LabelItem {
      text: string;
      class: string;
  }

  export interface ControlItemOptions {
    value: 'nombre',
    key: 'idProductor'
  }

  export interface ControlItem {
    type: 'typeahead' | 'autocomplete' | 'text' | 'select' ;
    class?: string,
    path:  string,
    options?: ControlItemOptions
    pasteFieldOnSelect?: string;
    defaultValue?: string;
  }

  export interface FilterItem {
    label: LabelItem;
    control: any;
    class: string;
    required: boolean;
  }

  export let filters = {
    p_cod_prod: {
      label: 'Productor',
      control: { 
        type: 'productor-control',
        class: 'col-sm-8',
        path: '/listas/LIST_PAS',
        options: {
          value: 'nombre',
          key: 'codpas',
          description: 'codpas'
        },
        pasteFieldOnSelect: 'nombre',
        defaultValue: '',
      },
      class: 'col-sm-12 col-md-12 col-lg-3'
    },
    p_x_asegurado: {
      label: 'Asegurado',
      control: { 
        type: 'typeahead',
        class: 'col-sm-8',
        path: '/listas/LIST_ASEGURADOS',
        options: {
          key: 'cod_asegurado',
          value: 'list_val_aseg',
          description: 'cod_asegurado'
        },
        notSelectedItemIsValid: true,
        apiSearchFieldname: 'p_filtro',
        pasteFieldOnSelect: 'cod_asegurado',
        defaultValue: '',
      },
      class: 'col-sm-12 col-md-12 col-lg-3'
    },
    p_fec_siniestro: {
      label: 'Fecha',
      control: {
        type: 'date-range',
        format: 'dd/mm/yyyy',
        config: {
          max: moment(),
          min: moment().subtract(20,'years')
        },
        defaultValues : {
          hasta: moment(),
          desde: moment().subtract(2, 'M')
        }
      },
      class: 'col-sm-12 col-md-12 col-lg-4',
      required: true
    },
    p_cod_sec: {
      label: 'Sección',
      control: { 
        type: 'select',
        searchable: true,
        path: '/listas/LIST_TIPOS_SECCIONES',
        options: {
          key: 'value',
          value: 'label'
        },
        pasteFieldOnSelect: 'value',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_o_siniestro: {
      label: 'Nro. Siniestro',
      control: {
          type: 'text',
          config: {
            maxlength: 10
          }
      },
      validators: [
        Validators.minLength(10)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_cod_poliza: {
      label: 'Póliza',
      control: {
          type: 'number',
          config: {
            maxlength: 10
          }
      },
      validators: [
        Validators.minLength(10)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_estado: {
      label: 'Estado',
      control: { 
        type: 'select',
        path: '/listas/LIST_ESTADOS_SIN',
        options: {
          key: 'cod_estado',
          value: 'desc_estado'
        },
        pasteFieldOnSelect: 'cod_estado',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      // required: true
    },
    p_tipo_denuncia: {
      label: 'Tipo Denuncia',      
      control: {
        type: 'select',
        list: [
          { key: '1', value: 'EXPRESS' },
          { key: '2', value: 'Tradicional' }          
        ],
        options: {
          value: 'value',
          key: 'key'
        },
        pasteFieldOnSelect: 'key',
        hasEmptyOption: false
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      // required: true
    },
    p_o_aviso: {
      label: 'Nro. Aviso',
      control: {
        type: 'text',
        config: {
          maxlength: 7
        }
      },
      validators: [
        Validators.minLength(7)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_dominio: {
      label: 'Dominio',
      control: {
        type: 'text',
        config: {
          maxlength: 7
        }
      },
      validators: [
        Validators.minLength(7)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2',
      hidden: true
    },
    p_ubicacion_riesgo: {
      label: 'Ubicación del Riesgo',
      control: {
        type: 'text',
        config: {
          maxlength: 10
        }
      },
      validators: [
        Validators.minLength(7)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2',
      hidden: true
    },
    p_dni_cert_vida: {
      label: 'DNI del Siniestrado',
      control: {
        type: 'number',
        config: {
          maxlength: 8
        }
      },
      validators: [
        Validators.minLength(7)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2',
      hidden: true
    },
    p_riesgo_agricola: {
      label: 'Riesgo Agrícola',
      control: {
        type: 'text',
        config: {
          maxlength: 12
        }
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      hidden: true
    },     
  };