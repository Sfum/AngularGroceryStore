import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-product-card-detail',
  templateUrl: './product-card-detail.component.html',
  styleUrls: ['./product-card-detail.component.css']
})
export class ProductCardDetailComponent {

  @Input()
  product: Product | undefined;

  @Output() addToCartEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() addToWishlistEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() addToCompareEvent: EventEmitter<any> = new EventEmitter<any>();

  addToCart(product: any) {
    this.addToCartEvent.emit(product);
  }

  addToWishlist(product: any) {
    this.addToWishlistEvent.emit(product);
  }

  addToCompare(product: any) {
    this.addToCompareEvent.emit(product);
  }
}
