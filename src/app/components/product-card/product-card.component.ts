import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {CartService} from "../../services/cart.service";
import {WishlistService} from "../../services/wishlist.service";
import {CompareService} from "../../services/compare.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  searchText: any;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private wishlistService: WishlistService,
              private compareService: CompareService) {
  }
  products!: Product[];


  products$ = this.productService.productsFiltered$

  onAddToCart(product: any) {
    this.cartService.addToCart(product)
  }
  onAddToWishlist(product: any) {
    this.wishlistService.addToWishlist(product)

  }

  onAddToCompare(product: any) {
    this.compareService.addToCompare(product)
  }
}
