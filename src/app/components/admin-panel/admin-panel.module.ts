import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from "@angular/router";
import { AdminPanelRoutingModule } from "./admin-panel-routing.module";

import { AdminPanelComponent } from "./admin-panel.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddCategoryComponent } from './shop-admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './shop-admin/category/edit-category/edit-category.component';
import { CategoriesListComponent } from './shop-admin/category/categories-list/categories-list.component';
import { AddSupplierComponent } from './shop-admin/supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './shop-admin/supplier/edit-supplier/edit-supplier.component';
import { SuppliersListComponent } from './shop-admin/supplier/suppliers-list/suppliers-list.component';
import { ShopAdminComponent} from "./shop-admin/shop-admin.component";
import {AppModule} from "../../app.module";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AdminPanelComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoriesListComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    SuppliersListComponent,
    ShopAdminComponent

  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    RouterLink,
    ReactiveFormsModule,
    AppModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminPanelModule { }
