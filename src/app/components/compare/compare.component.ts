import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {WishlistService} from "../../services/wishlist.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CompareService} from "../../services/compare.service";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent  implements OnInit {
  productList!: any[];

  products: Product[] = [];
  products$ = this.productService.products$

  constructor(
    private compareService: CompareService,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.productService.GetProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });

    this.compareService.loadCompare();
    this.products = this.compareService.getProduct();
  }

  addToCart(product: Product) {
    return this.cartService.addWishlistToCart(product);
  }

  addToWishlist(product: Product) {
    return this.wishlistService.addToWishlist(product);
  }

  removeFromCompare(product: Product) {
    this.compareService.removeProduct(product);
  }

}
