import { Component } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  constructor(private productService: ProductService) {}

  optionSupplierSelected(product: any) {
    return this.productService.optionSupplierSelected(product)

  }
}
