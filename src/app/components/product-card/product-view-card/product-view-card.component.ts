import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-product-view-card',
  templateUrl: './product-view-card.component.html',
  styleUrls: ['./product-view-card.component.css']
})
export class ProductViewCardComponent implements OnInit {
  getId: any;
  product?: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productCrudService: ProductService,
    private cartService: CartService,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.productCrudService.GetProduct(id).subscribe((product) => {
        this.product = product;
      });
    }
  }

  addToCart(product: any) {
    return this.cartService.addToCart(product);
  }
}
