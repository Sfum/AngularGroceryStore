import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-compare-detail',
  templateUrl: './compare-detail.component.html',
  styleUrls: ['./compare-detail.component.css']
})
export class CompareDetailComponent {

  @Input()
  products!: Product[];

  @Output() addToCartEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() addToWishlistEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeFromCompareEvent: EventEmitter<Product> = new EventEmitter<Product>();

  addToCart(product: Product) {
    this.addToCartEvent.emit(product);
  }

  addToWishlist(product: Product) {
    this.addToWishlistEvent.emit(product)
  }

  removeFromCompare(product: Product) {
    this.removeFromCompareEvent.emit(product)

  }
}
