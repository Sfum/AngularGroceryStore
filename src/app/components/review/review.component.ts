import { Component } from '@angular/core';
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(private reviewService: ReviewService) {
  }
  fetchReviews$ = this.reviewService.reviews$
}
