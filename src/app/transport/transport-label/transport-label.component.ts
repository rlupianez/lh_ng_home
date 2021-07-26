import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-label',
  templateUrl: './transport-label.component.html',
  styleUrls: ['./transport-label.component.scss']
})
export class TransportLabelComponent implements OnInit {

  @Input() text: string;
  
  constructor() { }

  ngOnInit() {
  }

}
