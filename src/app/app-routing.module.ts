import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductCardRoutingModule} from "./components/product-card/product-card-routing.module";
import {ReviewComponent} from "./components/review/review.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";
import {LandingComponent} from "./components/landing/landing.component";
import {CategoryComponent} from "./components/category/category.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {CompareComponent} from "./components/compare/compare.component";
import {ProductViewCardComponent} from "./components/product-card/product-view-card/product-view-card.component";
import {EditProductComponent} from "./components/admin-panel/shop-admin/product/edit-product/edit-product.component";
import {AddProductComponent} from "./components/admin-panel/shop-admin/product/add-product/add-product.component";
import {ProductsListComponent} from "./components/admin-panel/shop-admin/product/products-list/products-list.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent},
  {
    path: 'products',
    loadChildren: () => import('./components/product-card/product-card.module').then(x => x.ProductCardModule)
  },
  {path: 'products/:id', component: ProductViewCardComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product/:id', component: EditProductComponent},
  {path: 'products-list', component: ProductsListComponent},

  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'reviews', component: ReviewComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'compare', component: CompareComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes), ProductCardRoutingModule]
  ]
})
export class AppRoutingModule {
}
