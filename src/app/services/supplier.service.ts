import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  MOCK_URL = 'assets/json/supplier-data.json';

  constructor(private httpClient: HttpClient) {}

  suppliers$ = this.httpClient
    .get<Supplier[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Supplier: ', JSON.stringify)));
}
