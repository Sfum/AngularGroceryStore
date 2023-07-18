import {Injectable} from '@angular/core';
import {Product} from "../models/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  shareReplay,
  tap
} from "rxjs";
import {CategoryService} from "./category.service";
import {SupplierService} from "./supplier.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  MOCK_URL = 'assets/json/product-data.json';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    public router: Router,
    public location: Location
  ) {
  }

  products$ = this.httpClient
    .get<Product[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Product: ', JSON.stringify))); // get products from json file

  categories$ = this.categoryService.categories$
  suppliers$ = this.supplierService.suppliers$

  public supplierSelectedSubject = new BehaviorSubject<number>(0);
  supplierSelectedAction$ = this.supplierSelectedSubject.asObservable();

  supplierActionStream$ = combineLatest([
    this.products$,
    this.supplierSelectedAction$,
  ]).pipe(
    map(([products, selectedSupplierId]) =>
      products.filter((product) =>
        selectedSupplierId ? product.supplierId == selectedSupplierId : true
      )
    ),
    catchError((err) => {
      return EMPTY;
    })
  );

  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedSubject.next(0);
    this.categorySelectedSubject.next(0);
    this.supplierSelectedSubject.next(+selectedSupplierId); // emit the selected supplier id
  }

  public categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categoryActionStream$ = combineLatest([
    this.supplierActionStream$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedSupplierId]) =>
      products.filter((product) =>
        selectedSupplierId ? product.categoryId == selectedSupplierId : true
      )
    ),
    catchError((err) => {
      return EMPTY;
    })
  );

  onChangedCategory(selectedCategoryId: number) {
    this.supplierSelectedSubject.next(0);
    this.categorySelectedSubject.next(0);
    this.categorySelectedSubject.next(+selectedCategoryId);
  }

  productsFiltered$ = combineLatest([
    this.categoryActionStream$,
    this.suppliers$,
    this.categories$,
  ]).pipe(
    map(([products, suppliers, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            categoryId: categories.find((c) => product.categoryId === c.id)?.[
              'category_name'
              ],
            supplierId: suppliers.find((c) => product.supplierId === c.id)?.[
              'supplier_name'
              ],
          } as unknown as Product)
      )
    ),
    shareReplay(1)
  );
  filteredProducts$ = combineLatest([
    this.productsFiltered$,
    this.suppliers$,
    this.categories$,
  ]).pipe(
    map(([products, suppliers, categories]) => ({
      products,
      suppliers,
      categories,
    }))
  );
}