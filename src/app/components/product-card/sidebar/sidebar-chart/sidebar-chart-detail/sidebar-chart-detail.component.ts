import {Component, Input} from '@angular/core';
import {Product} from "../../../../../models/product";

@Component({
  selector: 'app-sidebar-chart-detail',
  templateUrl: './sidebar-chart-detail.component.html',
  styleUrls: ['./sidebar-chart-detail.component.css']
})
export class SidebarChartDetailComponent {
  @Input()
  product!: Product;
}
