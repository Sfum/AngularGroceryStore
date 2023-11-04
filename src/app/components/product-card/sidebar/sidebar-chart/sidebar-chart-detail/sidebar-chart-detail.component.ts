import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../../models/product";
import {CartService} from "../../../../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-chart-detail',
  templateUrl: './sidebar-chart-detail.component.html',
  styleUrls: ['./sidebar-chart-detail.component.css']
})
export class SidebarChartDetailComponent {

  @Input() product!: Product;
  @Output() onAddToCartEvent: EventEmitter<any> = new EventEmitter<any>()

  addToCart(product: Product) {
    this.onAddToCartEvent.emit(product)
  }
}
