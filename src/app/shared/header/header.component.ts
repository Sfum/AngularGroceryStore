import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private productService: ProductService) {}

  onWishlistClick() {
    this.productService.onWishlistClick();
  }

  onCartClick() {
    this.productService.onCartClick();
  }

  onCompareClick() {
    this.productService.onCompareClick();
  }

}
