import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { Observable, throwError, combineLatest } from 'rxjs';

import { delay, retry, catchError, finalize, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  retryRequestQty: number = 1;
  primaFiltes: object = {};
  sumaAsegurada: string;

  constructor(
    private apiService: ApiService, 
    private http: HttpClient, 
    private cookieService: CookieService,
    private coberturaTableService: CoberturasTableService) { }

    setSumaAsegurada(value){
      this.sumaAsegurada = value;
    }

     /**
     *  Guarda los filtros para obtener la prima de la cobertura
     */
    savePrimaFilters(filters){
      this.primaFiltes = filters;
    }

    getPrimaFilters(){
      return this.primaFiltes;
    }
    
    /**
     *  
     * Obtiene todos las coberturas de PRIMA_COBERTURA. Luego obtiene el premio PREMIO de cada Cobertura
     * 
     * @param filters 
     */
  
    getAllCoberturasPrima(filters){
      this.coberturaIsLoading(true);
  
      this.apiService.post('/cot_transp/PRIMA_COBERTURA',filters).subscribe( (res:any) => {
        const coberturas = res['result'] || [];
  
        if(coberturas.length > 0){
          
          this.getAllPremioCoberturas(coberturas, filters).subscribe( (res: object[]) => {
            let coberturasPremio = this.mergeCoberturaPremio(coberturas,res);
            const dataTable = this.initCoberturasData(coberturasPremio);
            this.coberturaTableService.setCoberturas(dataTable);
        
            this.coberturaIsLoading(false); 
          });
          
          // guardo los filtros en el servicio
          this.savePrimaFilters(filters);
  
        }else{
          this.coberturaTableService.action( {
            action: 'clear'
          });
          this.coberturaIsLoading(false);
        }
          
      });
    }
    


  /**
   * 
   * Obtiene el valor del premio por cada Cobertura.
   * Recibe el listado de coberturas
   * 
   * @param coberturas 
   * @param cobFilters 
   */
  getAllPremioCoberturas(coberturas: object[], cobFilters: object){

    let baseFilters = {
      "p_producto": cobFilters['p_producto'],
      "p_cod_mon": cobFilters['p_moneda'],
      "p_forma_pago":"T",
      "p_plan_pago":12,
      "p_cod_jur":1,
      "p_cod_suc":0,
      "p_cond_iva":"S",
      "p_cod_prod":9083,
      "p_pct_comis":3,
      // "p_cod_asegurado":"",
      "p_cod_docum":88,
      "p_documento":"20259109141"
    }


    let req = [];
    for(const cob of coberturas){

      if(cob){
          let itemFilter = {
            "p_cod_cobertura": cob['cobertura'],
            "p_prima": cob['prima'],
            "p_suma_asegurada": cob['suma_asegurada'],
          };

          let filtersData =  { ...baseFilters, ...itemFilter };
          req.push(this.getPremio(filtersData));
      }
    }
    return combineLatest(req);
  }

  getPremio(filters){
    return this.apiService.post('/cot_aero/PREMIO',filters, false);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  //
  //     PRIMA
  //
  /////////////////////////////////////////////////////////////////////////////////////////


  /**
   * 
   * Obtiene el valor de la prima dada una cobertura
   * 
   * @param path 
   * @param coberturaQuery 
   */
  getCoberturaPrima(path, coberturaQuery: object): Observable<object> {
    const pageSize = coberturaQuery['p_regxpag'];
    // obtiene la session de la cookie
    coberturaQuery['p_o_sesion'] = this.cookieService.get('sid');

    if(!path){
        console.error('Path debe ser definido');
        return;
    }

    return this.http.post(this.apiService.getApiUrl() + path, coberturaQuery, this.apiService.getHttpOptions())
        .pipe(
            retry(this.retryRequestQty),
            catchError( err => {
                return throwError(err);
            }),
            finalize (
                () => {
                    // this.loaderService.hide();
                    // this.hideLoader();
                }
            ),
            map(
                response => { 
                    // console.log('post response', response);
                    if(!response['p_error']){

                        return response;
                        
                    }else{
                        console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                        return null;
                    }
                    
                }
            ));
  }


  getAllPrimas(filters: object, coberturas: object[]): Observable<object>{
    // agrego todas las llamas al servicio
    let requestCob = []
    for(const cob of coberturas){

      if(cob['cod_cobert'] && this.filtersPrimaIsValid(filters)){
          let filtersData = filters;
          filtersData['p_cobertura'] = cob['cod_cobert'];
          requestCob.push(this.getCoberturaPrima('/cot_aero/PRIMA', filtersData));
      }
    }
    // todos los request
    return combineLatest(requestCob);
  }

  getPrima(filters){

    let primaFilters = this.getPrimaFilters();
    let mergedFilters = { ...primaFilters, ...filters};

    return this.getCoberturaPrima('/cot_aero/PRIMA', mergedFilters)
  }

  getPrimaPremio(cobs, filters){

    let requests = [];


    let primaFilters = this.getPrimaFilters();
    let mergedFilters = { ...primaFilters, ...filters};

    requests.push(this.getCoberturaPrima('/cot_aero/PRIMA', mergedFilters));
    requests.push(this.getAllPremioCoberturas(cobs,mergedFilters));

    return combineLatest(requests).pipe( map( (res: object[]) => {
      return { ...res[0], ...res[1][0] };
    }))
  }

  filtersPrimaIsValid(filters: object): boolean {

    if( filters['p_producto'] && 
        // filters['p_cobertura'] && 
        filters['p_cod_aero'] && 
        filters['p_list_usos'] && 
        filters['p_plazas'] && 
        filters['p_moneda']){
          return true;
    }

    return false;

  }


  /////////////////////////////////////////////////////////////////////////////////////////
  //
  //      Obtiene las coberturas guardadas (Modo Visualizacion)
  //
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * 
   * Obtiene las coberturas guardadas (Modo Visualizacion)
   * 
   * @param coberturaFilters 
   * @param primaFilters 
   */

  getCoberturas(coberturaFilters: object, primaFilters) {
    this.coberturaIsLoading(true);
    // ('inicializando coberturas');

    this.apiService.post('/listas/LIST_COBERTURAS',coberturaFilters).subscribe( (coberturas:any) => {
      // console.log('coberturas', coberturas);

      if(coberturas.length > 0){
        this.getAllPrimas(primaFilters, coberturas).subscribe( (primas:any) => {
          // console.log('primas', primas);
          const dataTable = this.genCoberturasDataTable(coberturas, primas);
          // agrega todos los datos de la tabla
          this.coberturaTableService.setCoberturas(dataTable);
          this.coberturaIsLoading(false);
          // guardo los filtros en el servicio
          this.savePrimaFilters(primaFilters);
        });
      }else{
        this.coberturaTableService.action( {
          action: 'clear'
        });
        this.coberturaIsLoading(false);
      }
        
    });
  }


  genCoberturasDataTable(coberturas: object[], primas: object[]){

    let coberturasData = [];

    for(let [index,cob] of coberturas.entries()){

      let obj = {
        selected: cob['obligatoria'] === 'S' ? true: false,
        required: cob['obligatoria'] === 'S' ? true: false,
        cod_cobert: cob['cod_cobert'],
        descri: cob['descri'],
        suma_asegurada: primas[index]['p_suma_asegurada'],
        prima: primas[index]['p_prima'],
        tasa: primas[index]['p_tasa']
      };

      coberturasData.push(obj);

    }

    // console.log('coberturas tabla', coberturasData);
    return coberturasData;
  }



  ////////////////////////////////////////////////////////////////////////
  //
  //    
  //            UI PARA MANEJO DE TABLAS DE COBERTURAS
  //
  //
  ////////////////////////////////////////////////////////////////////////


  /**
   * 
   * Une el listado de coberturas con el listado de premios
   * 
   * @param coberturas 
   * @param premios 
   */
  mergeCoberturaPremio(coberturas: object[], premios: object[]){
    let allData = [];
    for(let i = 0; i < coberturas.length; i ++ ){

      let item = { ...coberturas[i], ...premios[i] };
      allData.push(item);
    }

    return allData;
  }

  /**
   * 
   * Inicializa la tabla de coberturas, seteando los campos checkbox
   * 
   * @param coberturas 
   */
  initCoberturasData(coberturas){
    let coberturasData = [];

    for(let [index,cob] of coberturas.entries()){

      let obj = {
        selected: cob['obligatoria'] === 'S' ? true: false,
        required: cob['obligatoria'] === 'S' ? true: false,
        cod_cobertura: cob['cod_cobertura'],
        desc_cobertura: cob['desc_cobertura'],
        imp_suma_asegurada: this.sumaAsegurada,
        imp_prima: cob['imp_prima'],
        porc_tasa: cob['porc_tasa'],
        imp_premio: cob['p_premio']
      };

      coberturasData.push(obj);

    }

    // console.log('coberturas tabla', coberturasData);
    return coberturasData;
  }

  clearCoberturas(){
    this.coberturaTableService.action( {
      action: 'clear'
    });
  }

  coberturaIsLoading(loading: boolean){
    this.coberturaTableService.action( {
      action: 'loading',
      data: loading
    });
  }

 
  



}
