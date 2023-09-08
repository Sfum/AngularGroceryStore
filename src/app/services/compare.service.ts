import { Injectable } from '@angular/core';
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  constructor(private snackbarService: SnackbarService) {}

  products: any[] = [];

  addToCompare(product: any) {
    if (!this.productInCart(product)) {
      product.quantity = 1;
      this.addProductToCart(product);
      this.products = [...this.getProduct()];
      this.snackbarService.showSnackbar(`\`${product.product_name}\` by \`${product.supplierId}\` added to Compare`);
      product.in_compare = !product.in_compare;

    } else {
      alert('Item Already In Compare');
    }
  }
  getProduct() {
    return this.products;
  }

  addProductToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCompare();
  }

  saveCompare(): void {
    localStorage.setItem('compare_items', JSON.stringify(this.products));
  }

  loadCompare(): void {
    this.products =
      JSON.parse(localStorage.getItem('compare_items') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCompare();
    }
  }
}
