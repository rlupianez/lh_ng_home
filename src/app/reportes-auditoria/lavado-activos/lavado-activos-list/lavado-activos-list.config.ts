import * as moment from 'moment';
import { Validators } from '@angular/forms';
import { ColumnItem, FilterItem } from '@shared/ui-components/material-table/material-table.interfaces';

export let columns = {
  desc_asegurado: <ColumnItem>{ label: 'Asegurado', visible: true, class: 'col', suffix: 'asegurado', cellStyle: 'text-left' },
  desc_tipo_documento: <ColumnItem>{ label: 'Tipo Doc', visible: true, class: 'col', cellStyle: 'text-left' },
  nro_documento: <ColumnItem>{ label: 'Nro Doc', visible: true, class: 'col', cellStyle: 'text-left' },
  desc_personeria: <ColumnItem>{ label: 'Personeria', visible: true, class: 'col', cellStyle: 'text-left' },
  desc_tipo_cliente: <ColumnItem>{ label: 'Tipo Cliente', visible: true, class: 'col', cellStyle: 'text-left' },
  es_pep: <ColumnItem>{
    label: 'PEP',
    visible: true,
    class: 'col',
    defaultValue: 'No',
  },
  es_sujeto_obligado: <ColumnItem>{ label: 'Suj Obl.', visible: true, class: 'col' },
  cantidad_polizas: <ColumnItem>{ label: 'Pólizas', visible: true, class: 'col' },
  importe_prima_emitida: <ColumnItem>{ label: 'Prima', visible: true, class: 'col', cellStyle: 'text-right' },
  importe_suma_asegurada: <ColumnItem>{ label: 'Suma Asegurada', visible: true, class: 'col', cellStyle: 'text-right'  },
  suficiente: <ColumnItem>{ label: 'Doc. Suf.', visible: true, class: 'col' },
  desc_nivel_riesgo: <ColumnItem>{ label: 'Riesgo', visible: true, class: 'col' }
};

export let filters = {
  p_buscar: <FilterItem>{
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
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_personeria: <FilterItem>{
    label: 'Personería',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_PERSONAS',
      options: {
        key: 'codigo',
        value: 'descri'
      },
      pasteFieldOnSelect: 'codigo',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_cod_sec: <FilterItem>{
    label: 'Sección',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_RAMOS',
      options: {
        key: 'cod_sec',
        value: 'nombre'
      },
      pasteFieldOnSelect: 'cod_sec',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_nivel_riesgo: <FilterItem>{
    label: 'Nivel de Riesgo',
    control: {
      type: 'select',
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.LIST_NIVEL_RIESGO'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'valor',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_pep: <FilterItem>{
    label: 'PEP',
    control: {
      type: 'select',
      searchable: false,
      list: [
        { key: true, value: 'SI' },
        { key: false, value: 'NO' }
      ],
      options: {
        value: 'value',
        key: 'key'
      },
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false,
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_tipo_cliente: <FilterItem>{
    label: 'Tipo Cliente',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.TIPO_CLIENTE'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'valor',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_cant_poliza: <FilterItem>{
    label: 'Polizas',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.LIST_CANT_POLIZAS'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'valor',
      hasEmptyOption: true,
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_suma_asegurada: <FilterItem>{
    label: 'Suma Asegurada',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.LIST_SUMA_ASEG'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'desc_valor',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_prima_emitida: <FilterItem>{
    label: 'Prima Emitida',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.LIST_PRIMA'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'valor',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  p_estado: <FilterItem>{
    label: 'Documentacion',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_LAVADO',
      filters: {
        p_lista: 'LAVADO_ACTIVOS.ESTADO_DOCUMENTACION'
      },
      options: {
        key: 'valor',
        value: 'desc_valor'
      },
      pasteFieldOnSelect: 'valor',
      hasEmptyOption: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  }
};
