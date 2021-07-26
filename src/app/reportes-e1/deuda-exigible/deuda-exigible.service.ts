import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DEUDAEXIGIBLE } from './mock-deuda-exigible';
import { DeudaExigible } from './deuda-exigible.model';

@Injectable({
  providedIn: 'root'
})
export class DeudaExigibleService {

  constructor() { }

  getAll(): Observable<DeudaExigible[]> {
    return of(DEUDAEXIGIBLE);
  }

  getProductor(query: object): Observable<object[]> {
    return of ([{}]);
  }
}
