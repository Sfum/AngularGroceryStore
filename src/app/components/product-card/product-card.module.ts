import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

import {MatCardModule} from "@angular/material/card";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarChartComponent } from './sidebar/sidebar-chart/sidebar-chart.component';
import { SidebarChartDetailComponent } from './sidebar/sidebar-chart/sidebar-chart-detail/sidebar-chart-detail.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFilterDetailComponent } from './product-filter/product-filter-detail/product-filter-detail.component';
import { ProductViewCardComponent } from './product-view-card/product-view-card.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        RouterLink,
        MatCardModule,
        MatIconModule,
    ],
    exports: [
        SidebarChartComponent,
        ProductFilterComponent

    ],
  declarations: [


    SidebarComponent,
         SidebarChartComponent,
         SidebarChartDetailComponent,
         ProductFilterComponent,
         ProductFilterDetailComponent,
         ProductViewCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCardModule {
}
