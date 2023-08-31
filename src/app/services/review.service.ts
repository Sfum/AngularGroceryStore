import { Injectable } from '@angular/core';
import {Review} from "../models/review";
import {tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  MOCK_URL = 'assets/json/review-data.json';

  reviews$ = this.httpClient
    .get<Review[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Review: ', JSON.stringify)));

  constructor(private httpClient: HttpClient) {}
}

