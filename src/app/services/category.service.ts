import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  MOCK_URL = 'assets/json/category-data.json';

  categories$ = this.httpClient
    .get<Category[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Category: ', JSON.stringify)));
  constructor(private httpClient: HttpClient) {}
}
