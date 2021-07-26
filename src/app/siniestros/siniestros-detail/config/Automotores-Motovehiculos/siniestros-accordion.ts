import * as paneles from '../paneles/secciones-paneles.config';


/***
 * 
 * 
 * Aplicable a las secciones: Automotores (3) y Motovehículos (13)
 * 
 */

export const AutosSiniestrosAccordion =  {
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            datos_basicos: paneles.datos_basicos,
            subsiniestros: paneles.subsiniestros,
            inspecciones: paneles.inspecciones,
            reclamo_terceros: paneles.reclamo_terceros,
            pagos: paneles.pagos,
            verificaciones: paneles.verificaciones
        }
    }
}