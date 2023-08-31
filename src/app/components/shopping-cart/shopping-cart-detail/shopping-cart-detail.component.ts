import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../models/product";

@Component({
  selector: 'app-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.css']
})
export class ShoppingCartDetailComponent {

  @Input() products!: Product[];
  @Output() addToWishListEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeFromCartEvent: EventEmitter<Product> = new EventEmitter<Product>();


}
