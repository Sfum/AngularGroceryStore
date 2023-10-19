import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  REST_API = 'http://localhost:8000/supplier';

  constructor(private httpClient: HttpClient) {}

  suppliers$ = this.httpClient
    .get<Supplier[]>(this.REST_API)
    .pipe(tap((data) => console.log('Supplier: ', JSON.stringify)));

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  AddSupplier(data: Supplier): Observable<any> {
    let API_URL = `${this.REST_API}/add-supplier`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  GetSuppliers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetSupplier(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/supplier-detail/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  updateSupplier(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-supplier/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteSupplier(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-supplier/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
