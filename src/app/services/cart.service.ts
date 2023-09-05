import { Injectable } from '@angular/core';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  subTotal: number | undefined;

  constructor() {}

  addToCart(product: Product) {
    if (!this.productInCart(product)) {
      product.quantity = 1;
      this.addProductToCart(product);
      this.products = [...this.getProduct()];
      this.subTotal = product.price;
      product.in_cart = !product.in_cart;
    } else {
      alert('Product Already In Cart');
    }
  }
  addProductToCart(addedProduct: Product) {
    this.products.push(addedProduct);
    this.saveCart();
  }
  getProduct() {
    return this.products;
  }
  saveCart(): void {
    localStorage.setItem('total_price', JSON.stringify(this.products));
  }
  loadCart(): void {
    this.products =
      JSON.parse(localStorage.getItem('total_price') as any) || [];
  }
  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }
  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }
  clearProducts() {
    localStorage.clear();
  }
  addWishlistToCart(product: any) {
    if (!this.productInCart(product)) {
      product.quantity = 1;
      this.addToCart(product);
    } else {
      alert('Item Already In Cart');
    }
  }
}
