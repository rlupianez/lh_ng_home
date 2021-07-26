export interface ColumnItem {
    label: string;
    visible: boolean;
    class: string;
    icon?: string;
}

export let columns = {
    // select : { label: 'Select', visible: true, class: 'col' },
    productor : { label: 'Productor', visible: true, class: 'col' },
    descargar: { label: 'Descargar', visible: true, class: 'col', action: true, icon: 'far fa-file-pdf fa-lg' }
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
    idProductor : {
      label: { text: 'Productor', class: 'col-sm-4' },
      control: { 
        type: 'typeahead',
        class: 'col-sm-8',
        path: '/productores',
        options: {
          value: 'nombre',
          key: 'idProductor'
        },
        pasteFieldOnSelect: 'idProductor',
        defaultValue: '',
      },
      class: 'col-sm-3',
      required: true
    },
    dates: {
      label: { text: 'Fechas', class: 'col-sm-5' },
      control: { 
        type: 'date-range',
        class: 'col-sm-7',
        config: {
          containerClass: 'theme-dark-blue',
          dateInputFormat: 'MM/YYYY',
          minMode: 'month'
        }
      },
      fieldname: 'dates',
      class: 'col-sm-6',
      required: true
    }
};