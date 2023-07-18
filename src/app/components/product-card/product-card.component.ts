import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  searchText: any;

  constructor(private productService: ProductService) {
  }
  products!: Product[];

  products$ = this.productService.productsFiltered$

}
