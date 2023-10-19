import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../../models/product";
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, shareReplay, tap } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { SupplierService } from "../../services/supplier.service";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  MOCK_URL = 'http://localhost:8000';

  products$ = this.httpClient.get<Product[]>( this.MOCK_URL )
    .pipe(tap(data => console.log('Product: ', JSON.stringify))
    );

  categories$ = this.categoryService.categories$;
  suppliers$ = this.supplierService.suppliers$;

  constructor( private httpClient: HttpClient,
               private categoryService: CategoryService,
               private supplierService: SupplierService) {
  }

  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedSubject.next(+selectedSupplierId);
    return console.log(selectedSupplierId)
  }

  onSelectedCategory(selectedCategoryId: number) {
    this.categorySelectedSubject.next(+selectedCategoryId);
    return console.log(selectedCategoryId)
  }
  public supplierSelectedSubject = new BehaviorSubject<number>(0);
  supplierSelectedAction$ = this.supplierSelectedSubject.asObservable();

  supplierActionStream$ = combineLatest([
    this.products$,
    this.supplierSelectedAction$
  ]) .pipe(
    map( ( [products, selectedSupplierId] ) =>
      products.filter(product =>
        selectedSupplierId ? product.supplierId == selectedSupplierId : true,
      )),
    catchError(err => {
      return EMPTY;
    } )
  );

  public categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categoryActionStream$ = combineLatest([
    this.supplierActionStream$,
    this.categorySelectedAction$
  ]) .pipe(
    map( ( [products, selectedSupplierId] ) =>
      products.filter(product =>
        selectedSupplierId ? product.categoryId == selectedSupplierId : true,
      )),
    catchError(err => {
      return EMPTY;
    } )
  );

  productsSupplier$ = combineLatest([
    this.categoryActionStream$,
    this.suppliers$,
    this.categories$,
  ]).pipe(
    map(([products, suppliers, categories ]) =>
      products.map(product => ({
        ...product,
        categoryId: categories.find(c => product.categoryId === c.id)?.['category_name'],
        supplierId: suppliers.find(c => product.supplierId === c.id)?.['supplier_name'],
      } as unknown as Product))
    ),
    shareReplay(1)
  );
  filteredProducts$ = combineLatest([
    this.productsSupplier$,
    this.suppliers$,
    this.categories$,
  ])
    .pipe(
      map(([products, suppliers, categories]) =>
        ({ products, suppliers, categories }))
    );
}
