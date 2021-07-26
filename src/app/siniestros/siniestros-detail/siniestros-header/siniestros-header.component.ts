import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderActions } from '../config/siniestros-header-actions';

@Component({
  selector: 'app-siniestros-header',
  templateUrl: './siniestros-header.component.html',
  styleUrls: ['./siniestros-header.component.scss']
})
export class SiniestrosHeaderComponent implements OnInit {

  sectionName: string;
  sectionImg: string;

  siniestrosData: object;

  sectionActions: object[] = HeaderActions;

  @Input() set data(value){
    this.siniestrosData = value;
    if(value){
      this.sectionImg = value['icono_seccion'];
      this.sectionName = value['x_descripcion'];
    }
  }

  get data(){
    return this.siniestrosData;
  }


  @Input() actionsNav: object[];


  constructor(
    private navService: NavigationService,
    private http: HttpClient) {

  }

  ngOnInit(): void {
    
  }

  openAction(navItem: object, url: string){
    // Si clickea poliza
    if(navItem['field'] === 'poliza'){
      this.navService.navigateToPage(
        {
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          pagePath: `/poliza-cartera/${this.siniestrosData['poliza']}/${this.siniestrosData['cod_sec']}/0/0`
        }
      );
      return;
    }

    if(navItem['field'] === 'url_id_expedientes_sin'){
      this.http.get(url).subscribe( res => {
        //console.log('expediente res', res);
        if(res && res['id_expediente']){
          const id = res['id_expediente'];
          let link = this.siniestrosData['link_expedientes_sin'];

          link = link.replace('idExpediente', id);
          
          window.open(link, '_blank');
        }
      })

      return;

    }
    
    if(url){
      window.open(url, '_blank');
    }
  }

}
