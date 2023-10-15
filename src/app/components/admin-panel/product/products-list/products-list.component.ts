import {
  AfterViewInit,
  Component,
  Input,
  NgZone,
  ViewChild,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../models/product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'product_image',
    'product_name',
    'quantity',
    'price',
    'catalogue_number',
    'on_sale',
    'edit',
  ];
  dataSource: any;
  getId: any;
  updateForm!: FormGroup;
  Products: any = [];

  products: Product[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private productService: ProductService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngAfterViewInit() {
    this.loadProducts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.productService.GetProducts().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  vm$ = this.productService.filteredProducts$;

  onUpdate(): any {
    this.productService
      .updateProduct(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          if (window.confirm('Update this selection?'))
            this.ngZone.run(() => this.router.navigateByUrl('/admin-panel'));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.productService.deleteProduct(id).subscribe((res) => {
        this.Products.splice(i, 1);
      });
    }
    this.ngZone.run(() => this.router.navigateByUrl('/admin-panel'));
  }
}
