import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import * as moment from 'moment';

const form = {
  /*productor: {
    label: 'Autocomplete',
    control: { 
      type: 'typeahead',
          path: '/productores',
          options: {
            value: 'nombre',
            key: 'idProductor',
            description: 'idProductor'
          },
          pasteFieldOnSelect: 'idProductor',
          defaultValue: '', 
    },
    class: 'col-sm-12 col-md-12 col-lg-3',
    required: true
  },*/
  periodo: {
    control: {
      type: 'monthyear-range',
      format: 'mm/yyyy',
      config: {
        dateInputFormat: 'MM/YYYY',
        minMode: 'month',
        max: moment().endOf('month').subtract(1,'month'),
        min: moment().endOf('month').subtract(1,'month').subtract(50,'years')
      },
      defaultValues: {
        desde: moment().startOf('month').subtract(1,'month'),
        hasta: moment().endOf('month').subtract(1,'month')
     }
    },
    class: 'col-sm-12 col-md-12 col-lg-6',
  },
  archivo: {
    label: 'Select',
    control: { 
      type: 'select',
      options: [
        { key: 'xls', value: 'EXCEL' },
        { key: 'pdf', value: 'PDF' }
      ],
      pasteFieldOnSelect: 'value',
    },
    class: 'col-sm-12 col-md-12 col-lg-3'
  },
  rangoFechas: {
    control: {
      type: 'date-range',
      format: 'dd/mm/yyyy',
      config: {
        dateInputFormat: 'MM/YYYY',
        minMode: 'month',
        max: moment().endOf('month').subtract(1,'month'),
        min: moment().endOf('month').subtract(1,'month').subtract(7,'years')
      },
      defaultValues: {
        desde: moment().startOf('month').subtract(1,'month'),
        hasta: moment().endOf('month').subtract(1,'month')
     }
    },
    class: 'col-sm-12 col-md-12 col-lg-6',
  },
  /*formato: {
    label: 'Multi Select Async',
    control: { 
      type: 'select',
      path: '/seccion',
      options: {
        key: 'idSeccion',
        value: 'seccion'
      },
      pasteFieldOnSelect: 'idSeccion',
      multiselect: true
    },
    class: 'col-sm-12 col-md-12 col-lg-3',
    required: true
  },*/
  date: {
    label: 'Datepicker',
    control: { 
      type: 'datepicker',
      format: 'dd/mm/yyyy',
      config: {
        dateInputFormat: 'MM/YYYY',
        minMode: 'month',
        max: moment().endOf('month').subtract(1,'month'),
        min: moment().endOf('month').subtract(1,'month').subtract(7,'years')
      },
      defaultValues: {
        desde: moment().startOf('month').subtract(1,'month'),
        hasta: moment().endOf('month').subtract(1,'month')
     }
    },
    class: 'col-sm-12 col-md-12 col-lg-3',
    required: true
  }
}

import { cardAnimation } from '@core/animations/router.animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [ cardAnimation ]
})
export class FormComponent implements OnInit {

  form: object;
  formData: object = {};
  queryString: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.form = form;
  }

  getFormData(data){
    this.formData = data;
    this.queryString = this.apiService.generateStringFilter(data,this.form);
  }

}
