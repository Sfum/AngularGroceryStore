import {Component, EventEmitter, Output} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-filter-detail',
  templateUrl: './product-filter-detail.component.html',
  styleUrls: ['./product-filter-detail.component.css']
})
export class ProductFilterDetailComponent {

  @Output() supplierSelectedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private productService: ProductService,
              public router: Router) {
  }

  filterField$ = this.productService.filteredProducts$

  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedEvent.emit(selectedSupplierId);
  }
}
