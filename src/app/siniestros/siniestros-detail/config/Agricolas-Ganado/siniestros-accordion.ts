import * as paneles from '../paneles/secciones-paneles.config';


/***
 * 
 * 
 * Aplicable a las secciones: Riesgos Agrícolas (07) y Ganado (12)
 * 
 */

export const AgricolasGanadoAccordion =  {
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            datos_basicos: paneles.datos_basicos,
            subsiniestros: paneles.subsiniestros,
            reclamo_terceros: paneles.reclamo_terceros,
            pagos: paneles.pagos,
            reaseguro: paneles.reaseguro
        }
    }
}