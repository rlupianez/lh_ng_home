import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent, NovedadesItemDialog } from './home/home.component';

// Material Design
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatMenuModule } from '@angular/material/menu';
import { HomeFavoriteDirective } from './home/home-favorite.directive';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    HomeComponent, 
    NovedadesItemDialog, 
    HomeFavoriteDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    PipesModule,
    HomeRoutingModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
        // set defaults here
        "radius": 100,
        "space": -10,
        "outerStrokeGradient": true,
        "outerStrokeWidth": 10,
        "titleFontSize": '35',
        "showUnits": true,
        "unitsFontSize": '35',
        "subtitleFontSize": '20',
        "innerStrokeWidth": 10,
        "animateTitle": false,
        "animationDuration": 1000,
        "showBackground": false,
        "clockwise": false,
        "startFromZero": false,
        "imageHeight": 50,
        "imageWidth": 50
        }),
      CarouselModule
    ],
    entryComponents: [
      NovedadesItemDialog
    ] 
  })

export class HomeModule { }

