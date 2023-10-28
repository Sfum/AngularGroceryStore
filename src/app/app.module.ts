import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ProductCardDetailComponent} from './components/product-card/product-card-detail/product-card-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';

import {HttpClientModule} from "@angular/common/http";

import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from './shared/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";

import {LandingComponent} from './components/landing/landing.component';
import {CategoryComponent} from './components/category/category.component';
import {CategoryDetailComponent} from './components/category/category-detail/category-detail.component';
import {ViewCategoryComponent} from './components/category/view-category/view-category.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {
  ShoppingCartDetailComponent
} from './components/shopping-cart/shopping-cart-detail/shopping-cart-detail.component';
import {MatBadgeModule} from "@angular/material/badge";
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {WishlistDetailComponent} from './components/wishlist/wishlist-detail/wishlist-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {ReviewComponent} from './components/review/review.component';
import {ReviewDetailComponent} from './components/review/review-detail/review-detail.component';
import {ProductCardModule} from "./components/product-card/product-card.module";
import {CompareComponent} from './components/compare/compare.component';
import {CompareDetailComponent} from './components/compare/compare-detail/compare-detail.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddProductComponent } from './components/admin-panel/shop-admin/product/add-product/add-product.component';
import { EditProductComponent } from './components/admin-panel/shop-admin/product/edit-product/edit-product.component';
import { ProductsListComponent } from './components/admin-panel/shop-admin/product/products-list/products-list.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductCardDetailComponent,
    HeaderComponent,
    LandingComponent,
    CategoryComponent,
    CategoryDetailComponent,
    ViewCategoryComponent,
    ShoppingCartComponent,
    ShoppingCartDetailComponent,
    WishlistComponent,
    WishlistDetailComponent,
    ReviewComponent,
    ReviewDetailComponent,
    CompareComponent,
    CompareDetailComponent,
    SnackbarComponent,
    AddProductComponent,
    EditProductComponent,
    ProductsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet,
    MatBadgeModule,
    AppRoutingModule,
    ProductCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    ProductsListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
