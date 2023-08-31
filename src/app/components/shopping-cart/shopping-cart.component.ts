import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent   {

  products: Product[] = [];
  products$ = this.productService.products$

  constructor(private productService: ProductService,
              public router: Router ) {
  }

  ngOnInit() {

  }

  onCheckout() {
    localStorage.setItem('cart_items', JSON.stringify(this.total));
    this.router.navigate(['/payment']);
  }

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }
}
