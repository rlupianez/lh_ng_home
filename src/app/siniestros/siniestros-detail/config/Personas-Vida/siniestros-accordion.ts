import * as paneles from '../paneles/secciones-paneles.config';


/***
 * 
 * 
 * Aplicable a las secciones: Seguros de Personas – Vida – Vida Colectivo (23), Vida Individual (24), Vida Obligatorio (25), Colectivo Abierto (26) y Sepelio (27)
 * 
 */

export const PersonasVidaAccordion =  {
    expansion_form: {
        type: 'expansion-form',
        header: true,
        panels: {
            datos_basicos: paneles.datos_basicos,
            subsiniestros: paneles.subsiniestros,
            pagos: paneles.pagos,
            reaseguro: paneles.reaseguro
        }
    }
}