import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

import {MatCardModule} from "@angular/material/card";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarChartComponent } from './sidebar/sidebar-chart/sidebar-chart.component';
import { SidebarChartDetailComponent } from './sidebar/sidebar-chart/sidebar-chart-detail/sidebar-chart-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
  ],
  exports: [
    SidebarChartComponent

  ],
  declarations: [


    SidebarComponent,
         SidebarChartComponent,
         SidebarChartDetailComponent
  ]
})
export class ProductCardModule {
}
