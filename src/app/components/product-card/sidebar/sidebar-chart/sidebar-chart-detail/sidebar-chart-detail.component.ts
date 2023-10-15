import {Component, Input} from '@angular/core';
import {Product} from "../../../../../models/product";
import {CartService} from "../../../../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-chart-detail',
  templateUrl: './sidebar-chart-detail.component.html',
  styleUrls: ['./sidebar-chart-detail.component.css']
})
export class SidebarChartDetailComponent {
  @Input()
  product!: Product;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(product: Product) {
    if (!this.cartService.productInCart(product)) {
      product.quantity = 1;
      this.cartService.addToCart(product);
    }
  }
}
