import { Validators } from '@angular/forms';
export const TipoRiesgoFields = {
    es_flota: {
        label: 'Flota',
        disabled: true,
        control: {
            type: 'tile-select',
            //type: 'slide',
            defaultValue: false,
            list: [
                { key: false, value: 'Individual', icon: 'flight' },
                { key: true, value: 'Flota', icon: 'flight' }
            ]
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    }
}

export const TipoRiesgoGroup = {
    title: 'Tipo de Riesgo',
    icon: 'assignment_ind',
    container: 'expansion-panel',
    expanded: false,
    // class:'row subsection-content pl-3 pb-0 pt-0 pr-3',
    children:  TipoRiesgoFields
}

////////////////////////////////////////////////////////////////////


export const DatosRiesgoFields = {
    experimental: {
        label: 'Experimental',
        disabled: true,
        control: {
            type: 'slide',
            defaultValue: false
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    },
    cod_tipo_aeronave: {
        label: 'Tipo de Aeronave',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_TIPO_AERONAVE',
            options: {
                value: 'descripcion',
                key: 'cod_tipo_aeronave'
            },
            pasteFieldOnSelect: 'cod_tipo_aeronave',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    desc_tipo_aeronave: {
        label: 'Tipo de Aeronave',
        disabled: true,
        hidden: true,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    cod_marca: {
        label: 'Marca',
        disabled: true,
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_MARCAS_AERO',
            /*filters: {
                // p_seccion: 3,
                p_seccion: 14
            },*/
            options: {
                value: 'cod_marca',
                key: 'desc_marca',
                description: 'desc_marca'
            },
            apiSearchFieldname: 'p_busca',
            pasteFieldOnSelect: 'cod_marca',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ]
    },
    desc_marca: {
        label: 'Marca',
        disabled: true,
        hidden: true,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    marca_experimental: {
        label: 'Marca',
        disabled: true,
        hidden: true,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ]
    },
    cod_modelo: {
        label: 'Modelo',
        hidden: false,
        disabled: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_MARCAS_AERO',
            /*filters: {
                // p_seccion: 3,
                p_seccion: 14
            },*/
            options: {
                value: 'cod_modelo',
                key: 'desc_modelo',
                description: 'desc_modelo'
            },
            apiSearchFieldname: 'p_busca',
            pasteFieldOnSelect: 'cod_modelo',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ] 
        // class: 'col-sm-12 col-md-3 col-lg-3'
    },
    desc_modelo: {
        label: 'Modelo',
        disabled: true,
        hidden: true,
        control: {
            type: 'text',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ] 
        // class: 'col-sm-12 col-md-3 col-lg-3'
    },
    anio: {
        label: 'Año',
        disabled: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_MARCAS_AERO',
            /*filters: {
                // p_seccion: 3,
                p_seccion: 14
            },*/
            options: {
                value: 'anio',
                key: 'anio',
                // description: 'modelo'
            },
            apiSearchFieldname: 'p_busca',
            pasteFieldOnSelect: 'anio',
            hasEmptyOption: true
        },
        validators: [
            'required',
            Validators.maxLength(4),
            Validators.minLength(4)
        ],
        class: 'col-sm-12 col-md-3 col-lg-3',
    },
    anio_experimental: {
        label: 'Año',
        disabled: true,
        control: {
            type: 'number',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required',
            Validators.maxLength(4),
            Validators.minLength(4)
        ],
    },
    cant_plazas: {
        label: 'Plazas',
        disabled: true,
        control: {
            type: 'number',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-4',
        validators: [
            'required'
        ] 
    },
    peso_max_des: {
        label: 'PMD',
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
    },
    matricula: {
        label: 'Matricula',
        control: {
            type: 'text',
            config: {
                maxlength: 9
            }
            // appearance: 'standard'
        },
        validators: [
            'required'
        ],
        class: 'col-sm-12 col-md-3 col-lg-4'
    }
}


export const DatosRiesgoGroup = {
    class: 'container',
    hidden: false,
    disabled: false,
    children: DatosRiesgoFields
}

export const formFields = {
    experimental: { hidden: true, disabled: true },
    cod_tipo_aeronave: { hidden: false, disabled: false },
    desc_tipo_aeronave: { hidden: true, disabled: true },
    cod_marca: { hidden: false, disabled: true },
    desc_marca: { hidden: true, disabled: true },
    marca_experimental: { hidden: true, disabled: true },
    cod_modelo: { hidden: false, disabled: true },
    desc_modelo: { hidden: true, disabled: true },
    anio: { hidden: false, disabled: true },
    anio_experimental:{ hidden: true, disabled: true },
    cant_plazas: { hidden: false, disabled: true },
    peso_max_des: { hidden: false, disabled: true },
    matricula: { hidden: false, disabled: true }
}

export const viewFields = {
    experimental: { hidden: false, disabled: true },
    cod_tipo_aeronave: { hidden: true, disabled: true },
    desc_tipo_aeronave: { hidden: false, disabled: true },
    cod_marca: { hidden: true, disabled: true },
    desc_marca: { hidden: false, disabled: true },
    marca_experimental: { hidden: true, disabled: true },
    cod_modelo: { hidden: true, disabled: true },
    desc_modelo: { hidden: false, disabled: true },
    anio: { hidden: false, disabled: true },
    anio_experimental:{ hidden: true, disabled: true },
    cant_plazas: { hidden: false, disabled: true },
    peso_max_des: { hidden: false, disabled: true },
    matricula: { hidden: false, disabled: true }
}


///////////////////////////////////////////////////////
//
//              EMITIR
//
///////////////////////////////////////////////////////

export const tipoRiesgofieldsEmitir = {
    es_flota: {
        label: 'Flota',
        disabled: true,
        control: {
            type: 'tile-select',
            //type: 'slide',
            defaultValue: false,
            list: [
                { key: false, value: 'Individual', icon: 'flight' },
                { key: true, value: 'Flota', icon: 'flight' }
            ]
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    }
}

export const tipoRiesgoGroupEmitir = {
    class: 'container',
    hidden: false,
    disabled: false,
    children: tipoRiesgofieldsEmitir
}

export const datosRiesgosFieldsEmitir = {
    experimental: {
        label: 'Experimental',
        disabled: true,
        control: {
            type: 'slide',
            defaultValue: false
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    },
    desc_tipo_aeronave: {
        label: 'Tipo de Aeronave',
        disabled: true,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    desc_marca: {
        label: 'Marca',
        disabled: true,
        control: { 
            type: 'text'
        },
        class: 'col-sm-12 col-md-3 col-lg-3'
    },
    desc_modelo: {
        label: 'Modelo',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ] 
        // class: 'col-sm-12 col-md-3 col-lg-3'
    },
    anio: {
        label: 'Año',
        disabled: true,
        control: {
            type: 'number',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required',
            Validators.maxLength(4),
            Validators.minLength(4)
        ],
    },
    cant_plazas: {
        label: 'Plazas',
        disabled: true,
        control: {
            type: 'number',
            // appearance: 'standard'
        },
        class: 'col-sm-12 col-md-3 col-lg-4',
        validators: [
            'required'
        ] 
    },
    peso_max_des: {
        label: 'PMD',
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
    },
    matricula: {
        label: 'Matricula',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard'
        },
        validators: [
            'required'
        ],
        class: 'col-sm-12 col-md-3 col-lg-4'
    }
}

export const datosRiesgosGroupEmitir = {
    class: 'container',
    hidden: false,
    disabled: false,
    children: datosRiesgosFieldsEmitir
}
