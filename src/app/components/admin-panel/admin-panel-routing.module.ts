import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShopAdminComponent } from './shop-admin/shop-admin.component';

import { AddProductComponent } from './shop-admin/product/add-product/add-product.component';
import { EditProductComponent } from './shop-admin/product/edit-product/edit-product.component';
import { ProductsListComponent } from './shop-admin/product/products-list/products-list.component';

import { AddSupplierComponent } from './shop-admin/supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './shop-admin/supplier/edit-supplier/edit-supplier.component';
import { SuppliersListComponent } from './shop-admin/supplier/suppliers-list/suppliers-list.component';

import { AddCategoryComponent } from './shop-admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './shop-admin/category/edit-category/edit-category.component';
import { CategoriesListComponent } from './shop-admin/category/categories-list/categories-list.component';

const routes: Routes = [
  { path: '', component: ShopAdminComponent },

  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'products-list', component: ProductsListComponent },

  { path: 'add-supplier', component: AddSupplierComponent },
  { path: 'edit-supplier/:id', component: EditSupplierComponent },
  { path: 'suppliers-list', component: SuppliersListComponent },

  { path: 'add-category', component: AddCategoryComponent },
  { path: 'edit-category/:id', component: EditCategoryComponent },
  { path: 'categories-list', component: CategoriesListComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forChild(routes)]],
})
export class AdminPanelRoutingModule {}
