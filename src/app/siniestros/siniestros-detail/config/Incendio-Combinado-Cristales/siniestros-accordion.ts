import * as paneles from '../paneles/secciones-paneles.config';


/***
 * 
 * 
 * Aplica para Incendio (1), Combinado (2), Cristales (5), RC (8), Robo (9), Rs vs (15), SEguro Tecnico (16)
 * 
 */

export const IncendioSiniestrosAccordion =  {
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            datos_basicos: paneles.datos_basicos,
            subsiniestros: paneles.subsiniestros,
            inspecciones: paneles.inspecciones,
            reclamo_terceros: paneles.reclamo_terceros,
            pagos: paneles.pagos,
            liquilador: paneles.liquilador
        }
    }
}