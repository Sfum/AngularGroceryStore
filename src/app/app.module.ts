import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ProductCardDetailComponent} from './components/product-card/product-card-detail/product-card-detail.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from "@angular/common/http";

import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent } from './shared/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";

import { LandingComponent } from './components/landing/landing.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category/category-detail/category-detail.component';
import { ViewCategoryComponent } from './components/category/view-category/view-category.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartDetailComponent } from './components/shopping-cart/shopping-cart-detail/shopping-cart-detail.component';
import {MatBadgeModule} from "@angular/material/badge";
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistDetailComponent } from './components/wishlist/wishlist-detail/wishlist-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ReviewComponent } from './components/review/review.component';
import { ReviewDetailComponent } from './components/review/review-detail/review-detail.component';

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
    ReviewDetailComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
