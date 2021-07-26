import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '@core/services/components/home.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as animations from '@core/animations/router.animations';
import { take } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
//declare var jQuery: any;

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ToasterService } from '@core/services/toaster.service';
import { FilesService } from '@core/services/utils/files.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ 
    trigger('fadeIn', animations.SkeletonfadeIn()),
    trigger('fadeOut', animations.SkeletonfadeOut()),
    trigger('slideInLeft', animations.SlideInLeft() ),
    trigger('slideInRight', animations.SlideInRight())
  ]
})
export class HomeComponent implements OnInit {

  miListaItems : object[] = [];
  novedadesItems      : object[] = [];
  novedadesAllItems   : object[] = [];
  slidersItems        : object[] = [];
  notificaciones      : object[] = [];
  notifQty            : number = 0;
  indicadores         : object[] = [];
  cambios             : object[] = [];
  favManagerStatus: 'in' | 'out' = 'out';
  loadingFavorites: boolean = false;
  showCotSelector: boolean = false;
  visibleNovItemsQty: number = 2;
  visibleNovs: object[];
  favoritosDisponibles: object[];
  //screenSize: 'small' | 'medium' | 'large';

  novedadesResumen = 'Este es un resumen de novedades harcodeado ya que el actual devuelve tags de HTML';
  novedadesImagen = 'assets/img/empty-img.jpg';
  miListaIcono = 'home_car';

  initialLoading: boolean;
  indicadoresLoading: boolean;


  ///// Banner
  oBannerImgs: object;
  indicadoresBannerImg: string;

  // Visibilidad de paneles
  showBanner: boolean = false;
  showFavorites: boolean = false;
  showIndicadores: boolean = true;
  showCotizaciones: boolean = true;
  showNovedades: boolean = true;
  showCarrusel: boolean = true;


  emptyLista: object [] = [
    { icon: 'home_car', title: 'Automoviles', favorite: true },
    { icon: 'home_family', title: 'Combinado Familiar', favorite: true },
    { icon: 'home_shopping_bag', title: 'Comercio', favorite: true },
    { icon: 'home_building', title: 'Consorcio' },
    { icon: 'home_factory', title: 'Indutrias' },
    { icon: 'home_family', title: 'Combinado Familiar', favorite: true },
    { icon: 'home_shopping_bag', title: 'Comercio', favorite: true },
    { icon: 'home_building', title: 'Consorcio' }
  ];

  emptyNovedades: object [] = [
    { item: 1 },
    { item: 2 }
  ]

  emptyIndicadores: object [] = [
    { item: 1 },
    { item: 2 },
    { item: 3 }
  ]

  customOptions: OwlOptions = {
    loop: true,
    autoWidth:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    nav: true,
    navSpeed: 2000,
    items: 1,
    lazyLoad: true,
    autoHeight:true
    
    // navText: ['Previous', 'Next'],
  }

  favOptions: OwlOptions = {
    loop: false,
    autoWidth:true,
    mouseDrag: true,
    touchDrag: true,
    slideBy: 2,
    pullDrag: true,
    dots: false,
    nav: true,
    navSpeed: 1000,
    items: 9,
    lazyLoad: true,
    autoplay: false,
    autoHeight:true,
    navText: [
        '<i class="fa fa-chevron-circle-left"></i>',
        '<i class="fa fa-chevron-circle-right"></i>'
    ],
    
    // navText: ['Previous', 'Next'],
  }


  constructor(
    private homeService: HomeService, 
    private dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private fileService: FilesService) { 
    this.miListaItems = this.emptyLista;

    this.route.params.subscribe( params => {
      
      const routeData = route.snapshot.data;
      
      if(routeData.showSelector){
        this.showCotSelector = true;
      }else{
        this.showCotSelector = false;
      }
    });
  }
  
  ngOnInit() {
    this.loadingFavorites = true;
    this.showFavorites = true;
    this.initialLoading = true;
    this.homeService.getHomeData().subscribe( 
      res => {      
        
        if(res['config']){
          this.setVisibilityConfig(res['config']);
        }
        // carousel
        if(res['carrusel'] && res['carrusel'].length > 0){
          this.slidersItems = res['carrusel'];
        }
debugger
        if(res['novedades'] && res['novedades'].length > 0){
          this.novedadesAllItems = res['novedades'];
          this.novedadesItems = this.novedadesAllItems.slice(0,3);
        }

        if(res['milista'] && res['milista'].length > 0){
          this.miListaItems = res['milista'];
          this.favOptions.items = this.getMiListaByResolution();
          this.loadingFavorites = false;
          this.showFavorites = true;
        }else{
          this.showFavorites = false;
          this.loadingFavorites = false;
        }

        if(res['banner'] && res['banner'].length > 0){
          this.oBannerImgs = res['banner'][0];
          // this.showBanner = true;
        }

        if(res['banner_indicadores']){
          this.indicadoresBannerImg = res['banner_indicadores'];
        }

        if(res['cambios']){
          this.cambios = res['cambios'];
        }

       console.log('home data', res);
       // this.loadMoreNews();
       this.initialLoading = false;
    },
    error => {
      this.loadingFavorites = false;
      this.initialLoading = false;
    });

    this.getFavoritos();
    
    this.indicadoresLoading = true;
    this.homeService.getIndicadores().subscribe( res => {
      if(res['p_list_indicadores']){

        res['p_list_indicadores'].forEach(element => {
          element.desc_indicador=element.desc_indicador.replace('Indicador ','');
        });

        this.indicadores = res['p_list_indicadores'];
        this.indicadoresLoading = false;
      }
    });

  };


  get bannerImg(){
    return this.oBannerImgs && this.screenSize ? this.oBannerImgs[this.screenSize] : null;
  }

  showNovedad(itemId: number){
    const dialogRef = this.dialog.open(NovedadesItemDialog, {
      width: '70%',
      data: this.novedadesItems[itemId]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  getMiLista(){
    this.loadingFavorites = true;

    return new Observable( obs => { 
    
      this.homeService.getHomeData().subscribe( 
        res => {      

          if(res['milista']){
            this.miListaItems = res['milista'];
            //this.miListaItems.push({ icon: 'home_calculator', etiqueta: 'Cotizadores' });
          }
          // mi lista

          // novedades
          
        //console.log('home data', res);
        this.loadingFavorites = false;
        obs.next();
        
      },
      error => {
        this.loadingFavorites = false;
        obs.error();
       
      });
      
    });
  }

  getFavoritos(){
    this.homeService.getFavoritos().subscribe(
      res => {
        //console.log('favoritos data', res);
        if(res['disponibles']){
          this.favoritosDisponibles = res['disponibles'];
        }
        // this.loadingFavorites = false;
      },
      error => {
        // this.loadingFavorites = false;
      }
    )
  }

  changeFavManagerStatus(){
    this.favManagerStatus = 'in';
  }

  closeSelector(){
    this.showCotSelector = false;
  }

  saveFavoriteChanges(event){

    this.favManagerStatus = event.show ? 'in' : 'out';
   
    
    // si devuelve informacion es porque se deben guardar
    if(event.data){

      this.loadingFavorites = true;

      // agrego el o_favorito
      let removeFavoritosIds = [];
      for(let o_menu of event.data['remove']){

        const milistaItem = this.getMiListaFavoritoId(o_menu);

        if(milistaItem.length > 0){
          removeFavoritosIds.push(milistaItem[0]['o_favorito']);
        }
        console.log('mi lista favorito', milistaItem);

      }

      this.homeService.removeFavoritos( removeFavoritosIds ).subscribe(
        res => {
          
          if(res['p_respuesta'] !== 'error'){
            console.log('delete favoritos', res);

            this.homeService.addFavoritos( event.data['add'] ).subscribe(
              res => {
                console.log('add favoritos', res);
                if(res['p_respuesta'] !== 'error'){
                  
                }
                
                this.getMiLista().subscribe( res => {
                  this.toaster.show('Mi Lista actualizada correctamente', 'success');
                },
                error => {
                  // this.toaster.show('Ha ocurrido un error. Por favor intente nuevamente.', 'error');
                });
                
              
              },
              error => {
                this.toaster.show('Ha ocurrido un error. Por favor intente nuevamente.', 'error');
                this.loadingFavorites = false;  
              }
            );

          }else{
            this.getMiLista();
            this.toaster.show('Ha ocurrido un error. Por favor intente nuevamente.', 'error');
            this.loadingFavorites = false;
          }
          
        },
        error => {
          this.toaster.show('Ha ocurrido un error. Por favor intente nuevamente.', 'error');
          this.loadingFavorites = false;  
        }
      );
    }
    
    console.log('favoritos selected', event);
  }

  listAction(item: object){
    console.log('list action', item);
    if(item['url'] === '#home-selector-cotizadores'){
      this.showCotSelector = !this.showCotSelector;
    }else{
      //if(item['t_modulo'] === 'ANGULAR'){

        /*if(item['url']){
          const currentOriginUrl = this.fileService.getCurrentUrl();
          const link = `${currentOriginUrl}${item['url']}`;
          window.open(link);
        }*/
        //const url = item['url'].replace('/app/#', '');
        //this.router.navigate([url.trim()]);

      //}else{
        let ldData = {
          title: item['etiqueta'],
          type : item['t_modulo'],
          o_menu: item['o_menu'],
          url : item['url'],
          help : item['url_ayuda']
        };

        console.log('open link mi lista item = DATA load Module', JSON.stringify(ldData) );

        (<any>parent).loadModule(ldData);

      //}
    }
  }

  loadMoreNews(){

    this.novedadesItems = this.novedadesAllItems;
    

  }

  getMiListaFavoritoId(menuId){
    if (this.miListaItems.length > 0){

      return this.miListaItems.filter( item => {
        return item['o_menu'].toString() === menuId;
      });
    }
  }

  setVisibilityConfig(config: object){
    let oConfig = this.getObjectConfig(config);

    this.showBanner = oConfig['BANNER'];
    this.showFavorites = oConfig['MI_LISTA_FAV'];
    this.showIndicadores = oConfig['INDICADORES'];
    this.showCotizaciones = oConfig['COTIZACION_MONEDAS'];
    this.showNovedades = oConfig['NOVEDADES'];
    this.showCarrusel = oConfig['CARRUSEL'];
    
    console.log('width', screen.width);
  }

  getObjectConfig(config){
    let objectConfig = {};
    for(let item of config){

      objectConfig[item['objeto']] = item['mostrar'] === 'S' ? true : false;

    }

    return objectConfig;
  }

  get screenSize() : 'small' | 'medium' | 'large' {
    const width = screen.width;

    if(width > 975){
      return 'large';
    }

    if(width > 875 && width < 975 ){
      return 'large';
    }

    if(width > 775 && width < 875 ){
      return 'medium';
    }

    if(width > 675 && width < 775 ){
      return 'medium';
    }

    if(width > 575 && width < 675 ){
      return 'small';
    }

    if(width < 575 ){
      return 'small';
    }

  }

  getMiListaByResolution(){
    const width = screen.width;
    let displayItems = 9;

    if(width > 875 && width < 975 ){
      displayItems = 7;

    }

    if(width > 775 && width < 875 ){
      displayItems = 6;

    }

    if(width > 675 && width < 775 ){
      displayItems = 5;
    }

    if(width > 575 && width < 675 ){
      displayItems = 4;
    }

    if(width < 575 ){
      displayItems = 3;
    }

    return displayItems;
  }

  /**
   * 
   * Item de carousel clickeado
   * 
   * @param item { object } object de item de carousel
   */
  itemClicked(item){
    console.log('item clicked', item);
    if(item['url_pdf']){
      window.open(item['url_pdf'], '_blank');
    }
  }
  
}

@Component({
  selector: 'novedades-item-dialog',
  template: `
    <div mat-dialog-title class="row container nov-dialog-title d-flex mb-0">
        <h3 class="col-sm-12 col-md-9 col-lg-9">{{ data.titulo }}</h3>
        <span class="col-sm-12 col-md-3 col-lg-3 font-weight-light text-right">{{ data.fecha }}</span>
    </div>
    <div mat-dialog-content class="container h-auto nov-dialog-content m-0">
      <div class="nov-img">
        <img src="{{ data.url_imagen || novedadesImagen }}" class="d-block w-100" [alt]="title">
      </div>
      
      <p class="nav-dialog-text" [innerHTML]="data.mas_info"></p>
      
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button cdkFocusInitial (click)="closeDialog()">Cerrar</button>
    </div>
  `,
})
export class NovedadesItemDialog {

  novedadesImagen = 'assets/img/empty-img.jpg';

  constructor(
    public dialogRef: MatDialogRef<NovedadesItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  get title(){
    return this.data.title;
  }

}
