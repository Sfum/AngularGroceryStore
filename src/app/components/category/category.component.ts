import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService) {
  }

  categoriesView$ = this.categoryService.categories$;
}
