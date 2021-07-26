import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { COMISIONESFACTPEND } from './mock-comisiones-fact-pend';
import { ComisionesFactPend } from './comisiones-fact-pend.model';

@Injectable({
  providedIn: 'root'
})
export class ComisionesFactPendService {

  constructor() { }

  getAll(): Observable<ComisionesFactPend[]> {
    return of(COMISIONESFACTPEND);
  }

  getProductor(query: object): Observable<object[]> {
    return of ([{}]);
  }
}
