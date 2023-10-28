import {Component, EventEmitter, Output} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Router} from "@angular/router";
import {min} from "rxjs";

@Component({
  selector: 'app-product-filter-detail',
  templateUrl: './product-filter-detail.component.html',
  styleUrls: ['./product-filter-detail.component.css']
})
export class ProductFilterDetailComponent {
  sliderFilter: number = 50;
  minPrice: number = 1;
  maxPrice: number = 200;

  filterField$ = this.productService.filteredProducts$

  @Output() supplierSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChanged = new EventEmitter<{ minPrice: number; maxPrice: number }>();

  constructor(private productService: ProductService,
              public router: Router) {
  }

  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedEvent.emit(selectedSupplierId);
  }

  onFilterChange() {
    this.filterChanged.emit({ minPrice: this.minPrice, maxPrice: this.maxPrice });
  }

  protected readonly min = min;
}
