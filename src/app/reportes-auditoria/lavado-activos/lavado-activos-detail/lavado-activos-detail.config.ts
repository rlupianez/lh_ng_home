import { ColumnItem, IAccordion, FilterItem } from '@shared/ui-components/material-table/material-table.interfaces';
import { MatTableDataSource } from '@angular/material/table';


export const DatosGeneralesConsumidorFinal = {
    type: 'form',
    text: 'Datos Generales',
    cols: 2,
    fields: {
        cod_asegurado: {
            type: 'field',
            label: 'Código Interno'
        },
        desc_asegurado: {
            type: 'field',
            label: 'Asegurado'
        },
        desc_tipo_documento: {
            type: 'field',
            label: 'Tipo Documento'
        },
        nro_documento: {
            type: 'field',
            label: 'Número Documento'
        },
        domicilio: {
            type: 'field',
            label: 'Domicilio'
        },
        telefono: {
            type: 'field',
            label: 'Teléfono'
        },
    }
}
/*
export const DatosGeneralesNOConsumidorFinal = {
        type: 'form',
        text: 'Datos Generales',
        cols: 2,
        fields: {
            cod_asegurado: {
                type: 'field',
                label: 'Cód. Asegurado'
            },
            desc_asegurado: {
                type: 'field',
                label: 'Razón Social'
            },
        }
    }
*/
export const AseguradoDetail = {
    datos_productor: {
        type: 'form',
        text: 'Datos Productor',
        cols: 2,
        fields: {
            prod_codpas: {
                type: 'field',
                label: 'Cód. Productor'
            },
            prod_nombre: {
                type: 'field',
                label: 'Nombre'
            },
            prod_matricula: {
                type: 'field',
                label: 'Matrícula'
            },
            prod_e_mail: {
                type: 'field',
                label: 'Correo electrónico'
            },
            prod_domicilio: {
                type: 'field',
                label: 'Domicilio'
            },
            prod_telefono: {
                type: 'field',
                label: 'Teléfono'
            },
        }
    },
    datos_generales: {
        type: 'form',
        text: 'Datos Generales',
        cols: 2,
        fields: {
            cod_asegurado: { type: "field", label: "Código Interno" },
            desc_asegurado: { type: "field", label: "Asegurado" },
            desc_tipo_documento: { type: "field", label: "Tipo Documento" },
            domicilio: { type: "field", label: "Domicilio" },
            nro_documento: { type: "field", label: "Número Documento" },
            telefono: { type: "field", label: "Teléfono" }
        }
    },
    datos_fiscales: {
        type: 'form',
        text: 'Datos Fiscales',
        cols: 2,
        fields: {
            desc_condicion_fiscal: {
                type: 'field',
                label: 'Condición Fiscal'
            },
            desc_iibb: {
                type: 'field',
                label: 'Ingresos Brutos'
            },
            desc_personeria: {
                type: 'field',
                label: 'Personeria'
            },
            desc_actividad: {
                type: 'field',
                label: 'Actividad'
            },
        }
    },
    matriz_riesgo: {
        type: 'form',
        text: 'Matriz de Riesgo',
        cols: 4,
        fields: {
            desc_tipo_cliente: {
                type: 'field',
                label: 'Tipo Cliente'
            },
            es_pep: {
                type: 'field',
                label: 'PEP'
            },
            es_sujeto_obligado: {
                type: 'field',
                label: 'Sujeto Obligado'
            },
            desc_nivel_riesgo: {
                type: 'field',
                label: 'Nivel de Riesgo'
            },
            cantidad_polizas: {
                type: 'field',
                label: 'Pólizas'
            },
            importe_prima_emitida: {
                type: 'field',
                label: 'Monto Prima'
            },
            importe_suma_asegurada: {
                type: 'field',
                label: 'Suma Asegurada'
            },
            indemnizacion_siniestros: {
                type: 'field',
                label: 'Indemnización'
            },
        }
    }
}
export const AccordionSeccion: IAccordion = {
    active: <boolean>false,
    expanded: <boolean>false,
    title: <string>"Sección",
    loading: true,
    data: <MatTableDataSource<unknown>>null,
    type: 'table',
    columns: ["desc_seccion", "cantidad_polizas", "importe_prima", "suma_asegurada", "importe_sin_indem", "desc_nivel_riesgo"],
    emptyMessage: "No se encontraron datos",
    list: [
        {
            label: 'Sección',
            visible: true,
            name: "desc_seccion",
            type: 'text'
        },
        {
            label: 'Pólizas',
            visible: true,
            name: "cantidad_polizas",
            type: 'text',
        },
        {
            label: 'Monto Prima ($)',
            visible: true,
            name: "importe_prima",
            type: 'currency',
        },
        {
            label: 'Suma Asegurada ($)',
            visible: true,
            name: "suma_asegurada",
            type: 'currency',
        },
        {
            label: 'Indemnización ($)',
            visible: true,
            name: "importe_sin_indem",
            type: 'currency',
        },
        {
            label: 'Nivel de Riesgo',
            visible: true,
            name: "desc_nivel_riesgo",
            type: 'text',
        },
    ],

};

export const AccordionPoliza = {
    active: <boolean>false,
    expanded: <boolean>false,
    title: <string>"Póliza",
    loading: true,
    data: <MatTableDataSource<unknown>>null,
    type: 'table',
    disabled: true,
    columns: ["poliza", "fecha_emision", "fecha_vencimiento", "importe_prima", "suma_asegurada"],
    emptyMessage: "No se encontraron datos",
    list: [
        {
            label: 'Póliza',
            visible: true,
            name: "poliza",
            type: 'text'
        },
        {
            label: 'Emisión',
            visible: true,
            name: "fecha_emision",
            type: 'date',
        },
        {
            label: 'Fec. Vto',
            visible: true,
            name: "fecha_vencimiento",
            type: 'date',
        },
        {
            label: 'Monto prima ($)',
            visible: true,
            name: "importe_prima",
            type: 'currency',
        },
        {
            label: 'Suma Asegurada ($)',
            visible: true,
            name: "suma_asegurada",
            type: 'currency',
        },
    ],
};

export const AccordionDocumentacion = {
    active: <boolean>false,
    expanded: <boolean>false,
    title: <string>"Documentación",
    loading: true,
    loadingChanges: false,
    data: <MatTableDataSource<unknown>>null,
    type: 'table',
    disabled: true,
    headerCheckbox: true,
    headerCheckboxValue: true,
    headerCheckboxLabel: "Documentación Suficiente",
    columns: ["desc_documentacion", "desc_tipo_documentacion", "fec_vto_documentacion", "o_presentacion", "cod_estado_documentacion", "suficiente", "input_doc", "documentos"],
    emptyMessage: "No se encontraron datos",
    primaryKey: 'cod_documentacion', // cual es el identificador de los datos de resultado
    list: [
        {
            label: 'Documentación',
            visible: true,
            name: "desc_documentacion",
            type: 'text',
            editable: false,
            control: {},
            cellStyle: 'text-left'
        },
        {
            label: 'Tipo',
            visible: true,
            name: "desc_tipo_documentacion",
            type: 'text',
            cellStyle: 'text-left',
            control: {},
        },
        {
            label: 'Fec. Vto',
            visible: true,
            name: "fec_vto_documentacion",
            nameInput: "p_fecha_vencimiento",
            type: 'date',
            cellStyle: 'text-left',
            editable: true,
            control: {
                type: 'datepicker',
                format: 'dd/mm/yyyy',
                defaultValue: null,
                class: 'col-sm-8',
            },
        },
        {
            label: 'Presentación',
            visible: true,
            name: "o_presentacion",
            nameInput: "p_fecha_presentacion",
            type: 'date',
            cellStyle: 'text-left',
            editable: true,
            control: {
                type: 'datepicker',
                format: 'dd/mm/yyyy',
                defaultValue: null,
                class: 'col-sm-8',
            },
        },
        {
            label: 'Estado',
            visible: true,
            editable: true,
            name: "cod_estado_documentacion",
            displayName: "desc_estado_documentacion", //a los select dinamico le carga un campo displayName para que muestre este campo (descripcion)
            nameInput: "p_estado", // el nombre del input en caso de que sea editable
            type: 'select',
            cellStyle: 'text-left',
            control: {
                cache: true,
                type: 'select',
                searchable: true,
                path: '/listas/LIST_LAVADO',
                filters: {
                    p_lista: "LAVADO_ACTIVOS.ESTADO_DOCUMENTACION"
                },
                options: {
                    value: 'desc_valor',
                    key: 'valor'
                },
                pasteFieldOnSelect: 'valor',
                hasEmptyOption: false,
            },
        },
        {
            label: 'Suficiente',
            visible: true,
            editable: true,
            name: "suficiente",
            nameInput: "p_suficiente",
            type: 'select',
            control: {
                type: 'select',
                searchable: false,
                list: [ // cuando es un select hardcode cargo esta lista
                    { key: 'S', value: 'SI' },
                    { key: 'N', value: 'NO' }
                ],
                options: {
                    value: 'value',
                    key: 'key'
                },
                pasteFieldOnSelect: 'key',
                hasEmptyOption: false,
            },
            cellStyle: 'width-10',
        },
        {
            label: 'Cargar archivos',
            visible: true,
            name: "input_doc",
            nameInput: "input_doc_doc",
            editable: true,
            control: {
                type: 'file',
                defaultValue: null,
                class: 'col-sm-8',
            },
        },
        {
            label: 'Doc',
            visible: true,
            name: "documentos",
            editable: false,
            type: 'listLink',
            delete: true,
            control: {},
            cellStyle: "d-flex"
        }
    ],
};

export const AccordionAnalisis: IAccordion = {
    active: <boolean>false,
    expanded: <boolean>false,
    title: <string>"Análisis",
    loading: false,
    loadingChanges: false,
    data: <MatTableDataSource<unknown>>null,
    type: 'form',
    disabled: true,
    input: [{
        label: 'Análisis',
        visible: true,
        name: "analisis",
        type: 'text',
        editable: true,
        control: {
            type: 'textarea',
            defaultValue: null,
            class: 'col-sm-8',
        },
        cellStyle: 'text-left'
    }]
};

export const AccordionObservacion: IAccordion = {
    active: <boolean>false,
    expanded: <boolean>false,
    title: <string>"Observaciones",
    loading: false,
    loadingChanges: false,
    data: <MatTableDataSource<unknown>>null,
    type: 'form',
    disabled: true,
    input: [{
        label: 'Observaciones',
        visible: true,
        name: "observaciones",
        type: 'text',
        editable: true,
        control: {
            type: 'textarea',
            defaultValue: null,
            class: 'col-sm-8',
        },
        cellStyle: 'text-left'
    }]
};