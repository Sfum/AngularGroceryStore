import {Component, Input, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Product} from "../../../../models/product";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../../../services/product.service";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-sidebar-chart',
  templateUrl: './sidebar-chart.component.html',
  styleUrls: ['./sidebar-chart.component.css']
})
export class SidebarChartComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.products$
  products!: Product[];

  @Input()
  product: Product | undefined;

  constructor(public httpClient: HttpClient,
              private productService: ProductService,
              private cartService: CartService) {
  }
  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8000').pipe(
      map((products) => this.sortProductsBySales(products))
    );
  }

  sortProductsBySales(products: Product[]) {
    this.products = products;
    this.products$ = this.products$.pipe(
      map((products) => this.productService.sortProductsBySalesDescending(products))
    );
  }

  sortProductsByPrice(products: Product[]) {
    this.products = products;
    this.products$ = this.products$.pipe(
      map((products) => this.productService.sortProductsByPriceAscending(products))
    );
  }
  optionSupplierSelected(selectedSupplierId: number) {
    return this.productService.optionSupplierSelected(selectedSupplierId);
  }

  onAddToCart(product: Product) {
    if (!this.cartService.productInCart(product)) {
      product.quantity = 1;
      this.cartService.addToCart(product);
    }
  }
}
