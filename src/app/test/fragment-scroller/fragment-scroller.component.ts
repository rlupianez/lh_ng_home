import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-scroller',
  templateUrl: './fragment-scroller.component.html',
  styleUrls: ['./fragment-scroller.component.css']
})
export class FragmentScrollerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }

}
