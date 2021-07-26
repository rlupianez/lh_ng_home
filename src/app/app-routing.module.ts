import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthResolverService } from './core/services/auth/auth-resolver.service';

import { CotizarComponent } from './aeronavegacion/cotizar/cotizar.component';
import { EmitirComponent } from './aeronavegacion/emitir/emitir.component';

import { AseguradoBasicoListComponent } from './asegurados/asegurado-basico/asegurado-basico-list/asegurado-basico-list.component';
import { AseguradoBasicoDetailComponent } from './asegurados/asegurado-basico/asegurado-basico-detail/asegurado-basico-detail.component';

import { LavadoActivosListComponent } from './reportes-auditoria/lavado-activos/lavado-activos-list/lavado-activos-list.component';
import { LavadoActivosDetailComponent } from './reportes-auditoria/lavado-activos/lavado-activos-detail/lavado-activos-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'reportes-auditoria', loadChildren: () => import('./reportes-auditoria/reportes-auditoria.module').then(m => m.ReportesAuditoriaModule) },
  //{ path: 'lavado-activos', loadChildren: () => import('./lavado-activos/lavado-activos.module').then(m => m.LavadoActivosModule) },
  
  {
    path: 'lavado-activos',
    children: [
      { path: 'list', component: LavadoActivosListComponent, data: { title: 'Lavado de Activos' } },
      { path: ':id', component: LavadoActivosDetailComponent, data: { title: 'Detalle de Lavado de Activos de Asegurado'}}
    ]
  },
  
  
  
  
  { path: 'reportes-e1', loadChildren: () => import('./reportes-e1/reportes-e1.module').then(m => m.ReportesE1Module) },
  { path: 'reportes-productores', loadChildren: () => import('./productores/productores.module').then(m => m.ProductoresModule) },
  { path: 'cotizaciones-propuestas', loadChildren: () => import('./cotizaciones-propuestas/cotizaciones-propuestas.module').then(m => m.CotizacionesPropuestasModule) },
  { path: 'consulta-siniestros', loadChildren: () => import('./siniestros/siniestros.module').then(m => m.SiniestrosModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
  { path: 'aeronavegacion', loadChildren: () => import('./aeronavegacion/aeronavegacion.module').then(m => m.AeronavegacionModule) },
  { path: 'transporte', loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule) },
  { path: 'cotizador-vida', loadChildren: () => import('./life-quote/life-quote.module').then(m => m.LifeQuoteModule) },
  { path: 'cotizar', children: [
                    { path: '', component: CotizarComponent, data: { title: 'Cotizador' } },
                    { path: 'copy/:id', component: CotizarComponent, data: { title: 'Cotizador' } },
                    { path: ':id', component: CotizarComponent, data: { title: 'Cotizador' } }
                ]
            },
            { path: 'emitir', children: [
                    { path: ':id', component: EmitirComponent, data: { title: 'Cotizador' } }
                ] 
            },
            { 
                path: 'propuesta', children: [
                    { path: ':id', component: EmitirComponent, data: { title: 'Cotizador' } },
                    { path: 'view/:id', component: EmitirComponent, data: { title: 'Cotizador' } }
                ] 
            }, 
  { path: 'reclamos', loadChildren: () => import('./third-party-claims/siniestros-claims.module').then(m => m.SiniestrosClaimsModule) },
  ///Se modifican routings para el correcto Deploy en el ambiente de externos
  { path: 'poliza-cartera', loadChildren: () => import('./productores/poliza-en-cartera/poliza-en-cartera.module').then(m => m.PolizaEnCarteraModule) },
  { path: 'endosos', loadChildren: () => import('./productores/endosos/endosos.module').then(m => m.EndososModule) },
  { path: 'libros-rubricados', loadChildren: () => import('./productores/libros-rubricados/libros-rubricados.module').then(m => m.LibrosRubricadosModule) },
  { path: 'libros-rub-ope-cob', loadChildren: () => import('./productores/libros-rub-ope-cob/libros-rub-ope-cob.module').then(m => m.LibrosRubOpeCobModule) },
  
  { path: 'retenciones', loadChildren: () => import('./reportes-e1/retenciones/retenciones.module').then(m => m.RetencionesModule) },
  { path: 'cuenta-corriente', loadChildren: () => import('./reportes-e1/cuenta-corriente/cuenta-corriente.module').then(m => m.CuentaCorrienteModule) },
  { path: 'comisiones-fact-pend', loadChildren: () => import('./reportes-e1/comisiones-fact-pend/comisiones-fact-pend.module').then(m => m.ComisionesFactPendModule) },
  { path: 'incobrables', loadChildren: () => import('./reportes-e1/incobrables/incobrables.module').then(m => m.IncobrablesModule) },
  { path: 'asegurados', loadChildren: () => import('./asegurados/asegurados.module').then(m => m.AseguradosModule) },
  { path: 'asegurado-basico', loadChildren: () => import('./asegurados/asegurado-basico/asegurado-basico.module').then(m => m.AseguradoBasicoModule) },
  {
    path: 'asegurados/asegurado-basico',
    children: [
      { path: 'list', component: AseguradoBasicoListComponent, data: { title: 'Asegurado Básico'}},
      { path: ':id', component: AseguradoBasicoDetailComponent, data: { title: 'Detalle Asegurado Básico'}}
    ]
  },  
  { path: 'deuda-exigible', loadChildren: () => import('./reportes-e1/deuda-exigible/deuda-exigible.module').then(m => m.DeudaExigibleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      useHash: true,
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
