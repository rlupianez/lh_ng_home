import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[favoriteBadge]'
})
export class HomeFavoriteDirective {

  @Input() matBadgeIcon: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit() {
    /*
    const badge = this.el.nativeElement.querySelector('.mat-badge-content');
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.innerHTML = `<i class="material-icons" style="font-size: 13px">star</i>`;
    */

     const badge = this.el.nativeElement.querySelector('.mat-badge-content');
     if(badge){
      badge.style.display = 'flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.innerHTML = `<i class="material-icons" style="font-size: 13px">star</i>`;
     }
    
  }

}
