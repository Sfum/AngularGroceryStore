import {Injectable} from '@angular/core';
import {Product} from "../models/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map, Observable,
  shareReplay,
  tap
} from "rxjs";
import {CategoryService} from "./category.service";
import {SupplierService} from "./supplier.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  MOCK_URL = 'http://localhost:8000';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  private minPrice!: number;

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) {
  }

  products$ = this.httpClient
    .get<Product[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Product: ', JSON.stringify)));

  categories$ = this.categoryService.categories$
  suppliers$ = this.supplierService.suppliers$

  private products: Product[] = []; // Initialize with your product data
  private productsFilteredSubject = new BehaviorSubject<Product[]>(this.products);
  productsFiltered$ = this.productsFilteredSubject.asObservable();

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

  productsArrayFiltered$ = combineLatest([
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
    this.productsArrayFiltered$,
    this.suppliers$,
    this.categories$,
  ]).pipe(
    map(([products, suppliers, categories]) => ({
      products,
      suppliers,
      categories,
    }))
  );
    sortProductsByPriceAscending(products: Product[]): Product[] {
        return products.slice().sort((a, b) => a.price - b.price); // sort products by price ascending
    }
    sortProductsBySalesDescending(products: Product[]): Product[] {
        return products.slice().sort((a, b) => b.sales - a.sales); // sort products by sales descending
    }
  GetProducts() {
    return this.httpClient.get(`${this.MOCK_URL}`);  // get products from json file
  }
  onCartClick() {
    this.router.navigate(['./shopping-cart']); // navigate to shopping cart page
  }
  onWishlistClick() {
    this.router.navigate(['./wishlist']);
  }
  onCompareClick() {
    this.router.navigate(['./compare']); // navigate to compare page
  }
  AddProduct(data: Product): Observable<any> {
    let API_URL = `${this.MOCK_URL}/add-product`;
    return this.httpClient.post(API_URL, data);
  }

  GetProduct(id: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/product/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }
  updateProduct(id: any, data: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/update-product/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders });
  }
  deleteProduct(id: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/delete-product/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders });
  }

  filterProductsByPrice(minPrice: number, maxPrice: number) {
    const filteredProducts = this.products.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
    this.productsFilteredSubject.next(filteredProducts);
    console.log(this.minPrice)
  }
}
