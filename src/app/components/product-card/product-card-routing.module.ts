import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {ProductCardComponent} from "./product-card.component";
import {ProductCardDetailComponent} from "./product-card-detail/product-card-detail.component";
import {ProductViewCardComponent} from "./product-view-card/product-view-card.component";


const childRoutes: Routes = [
  {path: 'products', component: ProductCardComponent},
  {path: 'product/:id', component: ProductViewCardComponent},
  {path: 'card-detail', component: ProductCardDetailComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(childRoutes)]
  ]
})
export class ProductCardRoutingModule {
}
