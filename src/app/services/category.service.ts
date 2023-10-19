import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  REST_API = 'http://localhost:8000/category';
  // REST_API = 'assets/json/category-data.json';

  categories$ = this.httpClient
    .get<Category[]>(this.REST_API)
    .pipe(tap((data) => console.log('Category: ', JSON.stringify)));
  constructor(private httpClient: HttpClient) {}

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  AddCategory(data: Category): Observable<any> {
    let API_URL = `${this.REST_API}/add-category`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  GetCategories() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  GetCategory(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/category-detail/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  updateCategory(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-category/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  deleteCategory(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-category/${id}`;
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
