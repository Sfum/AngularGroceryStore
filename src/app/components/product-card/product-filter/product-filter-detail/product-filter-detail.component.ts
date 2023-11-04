import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Supplier} from "../../../../models/supplier";

@Component({
  selector: 'app-product-filter-detail',
  templateUrl: './product-filter-detail.component.html',
  styleUrls: ['./product-filter-detail.component.css']
})
export class ProductFilterDetailComponent {
  sliderFilter: number = 50;
  minPrice: number = 1;
  maxPrice: number = 200;

  @Input() filterField$?: Observable<Supplier[]>
  @Output() supplierSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChanged = new EventEmitter<{ minPrice: number; maxPrice: number }>();

  constructor(public router: Router) {
  }

  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedEvent.emit(selectedSupplierId);
  }

  onFilterChange() {
    this.filterChanged.emit({ minPrice: this.minPrice, maxPrice: this.maxPrice });
  }
}
