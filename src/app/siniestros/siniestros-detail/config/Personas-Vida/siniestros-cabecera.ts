
/***
 * 
 * 
 * Aplicable a las secciones: Seguros de Personas – Vida – Vida Colectivo (23), Vida Individual (24), Vida Obligatorio (25), Colectivo Abierto (26) y Sepelio (27)
 * 
 */

export const PersonasVidaCabecera = {
        form: {
            col_1: {
                type: 'form',
                class: '',
                fields: {
                    o_siniestro: { type: 'field', label: 'Siniestro' },
                    x_asegurado: { type: 'field', label: 'Asegurado' },
                    poliza: { type: 'field', label: 'Póliza' },
                    lugar_ocurrencia: { type: 'field', label: 'Lugar de Ocurrencia' },
                    fec_siniestro: { type: 'field', label: 'Fecha de Ocurrencia' },
                }
            },
            col_2: {
                type: 'form',
                class: '',
                fields: {
                    x_productor: { type: 'field', label: 'Productor' },
                    vig_desde_poliza: { type: 'field', label: 'Vigencia Desde' },
                    vig_hasta_poliza: { type: 'field', label: 'Vigencia Hasta' },
                    forma_ocurrencia: { type: 'field', label: 'Forma de Ocurrencia' },
                    fec_denuncia: { type: 'field', label: 'Fecha de Denuncia' },
                }
            },
            col_3: {
                type: 'form',
                class: '',
                fields: {
                    tramitador: { type: 'field', label: 'Tramitador' },
                    estado_poliza: { type: 'field', label: 'Estado Póliza' },
                    tipo_denuncia: { type: 'field', label: 'Tipo de Denuncia' },
                    x_estado: { type: 'field', label: 'Estado' }
                }
            }
        }
}