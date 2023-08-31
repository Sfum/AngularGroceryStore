import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {WishlistService} from "../../services/wishlist.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{

  products: Product[] = [];
  products$ = this.productService.products$

  constructor(private cartService: CartService,
              private wishlistService: WishlistService,
              private productService: ProductService) {
  }
  ngOnInit() {
    this.wishlistService.loadCart();
    this.products = this.wishlistService.getProduct();
  }

  onAddToCart(product: Product) {
    this.cartService.addWishlistToCart(product);
  }

  removeFromWishlist(product: Product) {
    this.wishlistService.removeProduct(product);
  }

}
