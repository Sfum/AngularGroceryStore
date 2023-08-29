import { Component } from '@angular/core';
import {ProductService} from "./services/product.service";
import {CategoryService} from "./services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              public router: Router) {
  }
  navigationLoop$ = this.categoryService.categories$;

  onChangedCategory(selectedCategoryId: number) {
    this.productService.onChangedCategory(selectedCategoryId + 1);
    this.router.navigate(['/products']);

  }
  showAllProducts() {
    this.productService.onChangedCategory(0);
    this.router.navigate(['/products'])
  }

}
