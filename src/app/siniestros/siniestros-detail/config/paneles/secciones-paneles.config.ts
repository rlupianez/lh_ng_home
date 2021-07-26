/********************************************************************
 *                  PANELES
 ********************************************************************/


/*=======================================
 *  Datos Básicos
 ========================================*/

export const datos_basicos = {
    icon: 'detalle_bienes',
    text: 'Datos Básicos',
    type: 'expansion-panel',
    expanded: false,
    content: {
        datos_basicos: {
            form: {
                cols: 3,
                fields: {
                    fec_siniestro: { type: 'field', label: 'Ocurrencia' },
                    hora: { type: 'field', label: 'Hora' },
                    t_lugar: { type: 'field', label: 'Lugar' },
                    x_calle: { type: 'field', label: 'Calle' },
                    n_numero: { type: 'field', label: 'Nro. Puerta' },
                    x_cod_postal: { type: 'field', label: 'Cod. Postal' },
                    jurisdiccion: { type: 'field', label: 'Jurisdicción' },
                    partido: { type: 'field', label: 'Partido' },
                    localidad: { type: 'field', label: 'Localidad' },
                    carroceria: { type: 'field', label: 'Conductor' },
                    dni: { type: 'field', label: 'DNI' },
                    telefono: { type: 'field', label: 'Teléfono' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Subsiniestros
 ========================================*/
export const subsiniestros = {
    icon: 'files',
    text: 'Subsiniestros',
    type: 'expansion-panel',
    expanded: false,
    content: {
        subsiniestros: {
            form: {
                cols: 2,
                fields: {
                    tipo_siniestro: { type: 'field', label: 'Tipo Siniestro' },
                    estado: { type: 'field', label: 'Estado' },
                    tramite: { type: 'field', label: 'Trámite' },
                    riesgo: { type: 'field', label: 'Riesgo' },
                    cobertura: { type: 'field', label: 'Cobertura Afectada' },
                    idclaim: { type: 'field', label: 'ID CLAIM' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Inspecciones
 ========================================*/

export const inspecciones = {
    icon: 'files',
    text: 'Inspecciones',
    type: 'expansion-panel',
    expanded: false,
    content: {
        inspecciones: {
            form: {
                cols: 3,
                fields: {
                    subsiniestro: { type: 'field', label: 'Subsiniestro' },
                    fecha: { type: 'field', label: 'Fecha' },
                    riesgo: { type: 'field', label: 'Riesgo' },
                    inspector: { type: 'field', label: 'Inspector Asignado' },
                    lugar: { type: 'field', label: 'Lugar' },
                    taller: { type: 'field', label: 'Taller de Reparación' },
                    contacto: { type: 'field', label: 'Contacto' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Reclamo Terceros
 ========================================*/ 
export const reclamo_terceros = {
    icon: 'home_umbrella',
    text: 'Reclamo de Terceros',
    type: 'expansion-panel',
    expanded: false,
    content: {
        reclamo_terceros: {
            form: {
                cols: 3,
                fields: {
                    subsiniestro: { type: 'field', label: 'Nro. Reclamo' },
                    fecha: { type: 'field', label: 'Nombre Tercero' },
                    riesgo: { type: 'field', label: 'Bien Afectado' },
                    inspector: { type: 'field', label: 'Monto Indemizado' },
                    lugar: { type: 'field', label: 'Ver Documentos' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Pagos
 ========================================*/

export const pagos = {
    icon: 'pagos',
    text: 'Pagos',
    type: 'expansion-panel',
    expanded: false,
    content: {
        pagos: {
            form: {
                cols: 2,
                fields: {
                    orden_pago: { type: 'field', label: 'Operación Asociada' },
                    moneda: { type: 'field', label: 'Moneda' },
                    fecha: { type: 'field', label: 'Fecha' },
                    pagado: { type: 'field', label: 'Pagado' },
                    x_beneficiario: { type: 'field', label: 'Beneficiario' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Verificaciones
 ========================================*/
export const verificaciones = {
    icon: 'detalle_bienes',
    text: 'Verificaciones/ Investigaciones',
    type: 'expansion-panel',
    expanded: false,
    content: {
        verificaciones: {
            form: {
                cols: 2,
                fields: {
                    fecha: { type: 'field', label: 'Fecha' },
                    liquilador: { type: 'field', label: 'Liquilador' },
                    informe: { type: 'field', label: 'Informe' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Liquilador
 ========================================*/

export const liquilador = {
    icon: 'detalle_bienes',
    text: 'Informe del Liquilador',
    type: 'expansion-panel',
    expanded: false,
    content: {
        liquilador: {
            form: {
                cols: 2,
                fields: {
                    fecha: { type: 'field', label: 'Fecha' },
                    liquilador: { type: 'field', label: 'Liquilador' },
                    informe: { type: 'field', label: 'Informe' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

/*=======================================
 *  Reaseguro
 ========================================*/

 export const reaseguro = {
    icon: 'detalle_bienes',
    text: 'Reaseguro',
    type: 'expansion-panel',
    expanded: false,
    content: {
        reaseguro: {
            form: {
                cols: 2,
                fields: {
                    fecha: { type: 'field', label: 'Fecha' },
                    liquilador: { type: 'field', label: 'Liquilador' },
                    informe: { type: 'field', label: 'Informe' }
                }
            },
            list: {
                control: {
                    items: {
                    },
                    defaultData: [],
                    columns: []
                }
            }
        }
    }
}

