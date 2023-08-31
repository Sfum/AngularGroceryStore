import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Product} from "../../../models/product";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.component.html',
  styleUrls: ['./wishlist-detail.component.css'],
})
export class WishlistDetailComponent {

  @Input()  products!: Product[];

  @Output() addToCartEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeWishlistEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    public router: Router,
    public location: Location) {
  }

  addProductToCart(product: Product) {
    this.addToCartEvent.emit(product);
  }

  removeFromWishlist(product: Product) {
    this.removeWishlistEvent.emit(product);
  }

  onClickBack() {
    this.location.back();
  }
}
