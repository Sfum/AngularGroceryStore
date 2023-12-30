
import { Injectable } from '@angular/core';
import { Product } from "../models/product";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, shareReplay, tap } from "rxjs";
import { CategoryService } from "./category.service";
import { SupplierService } from "./supplier.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Mock API URL for product data
  MOCK_URL = 'http://localhost:8000';

  // HTTP headers for JSON content
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  // Minimum price variable (initialized later)
  private minPrice!: number;

  // Constructor injecting required services and modules
  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) { }

  // Observable for retrieving products from the mock API
  products$ = this.httpClient
    .get<Product[]>(this.MOCK_URL)
    .pipe(tap((data) => console.log('Product: ', JSON.stringify)));

  // Observables for category and supplier data from their respective services
  categories$ = this.categoryService.categories$;
  suppliers$ = this.supplierService.suppliers$;

  // Private variables for product data and filtered product subject
  private products: Product[] = [];
  private productsFilteredSubject = new BehaviorSubject<Product[]>(this.products);
  productsFiltered$ = this.productsFilteredSubject.asObservable();

  // Subject and Observable for selected supplier
  public supplierSelectedSubject = new BehaviorSubject<number>(0);
  supplierSelectedAction$ = this.supplierSelectedSubject.asObservable();

  // Combining products and selected supplier to filter products by supplier
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

  // Method to handle selecting a supplier
  optionSupplierSelected(selectedSupplierId: number) {
    this.supplierSelectedSubject.next(0);
    this.categorySelectedSubject.next(0);
    this.supplierSelectedSubject.next(+selectedSupplierId); // emit the selected supplier id
  }

  // Subject and Observable for selected category
  public categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // Combining supplier-filtered products and selected category to filter products by category
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

  // Method to handle changing the selected category
  onChangedCategory(selectedCategoryId: number) {
    this.supplierSelectedSubject.next(0);
    this.categorySelectedSubject.next(0);
    this.categorySelectedSubject.next(+selectedCategoryId);
  }

  // Combining category-filtered products with additional information (supplier and category names)
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
            categoryId: categories.find((c) => product.categoryId === c.id)?.['category_name'],
            supplierId: suppliers.find((c) => product.supplierId === c.id)?.['supplier_name'],
          } as unknown as Product)
      )
    ),
    shareReplay(1)
  );

  // Combining filtered products with suppliers and categories
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

  // Sorting products by price in ascending order
  sortProductsByPriceAscending(products: Product[]): Product[] {
    return products.slice().sort((a, b) => a.price - b.price);
  }

  // Sorting products by sales in descending order
  sortProductsBySalesDescending(products: Product[]): Product[] {
    return products.slice().sort((a, b) => b.sales - a.sales);
  }

  // Method to get products from the mock API
  GetProducts() {
    return this.httpClient.get(`${this.MOCK_URL}`);
  }

  // Method to navigate to the shopping cart page
  onCartClick() {
    this.router.navigate(['./shopping-cart']);
  }

  // Method to navigate to the wishlist page
  onWishlistClick() {
    this.router.navigate(['./wishlist']);
  }

  // Method to navigate to the compare page
  onCompareClick() {
    this.router.navigate(['./compare']);
  }

  // Method to add a new product
  AddProduct(data: Product): Observable<any> {
    let API_URL = `${this.MOCK_URL}/add-product`;
    return this.httpClient.post(API_URL, data);
  }

  // Method to get a specific product by ID
  GetProduct(id: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/product/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }

  // Method to update a product by ID
  updateProduct(id: any, data: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/update-product/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders });
  }

  // Method to delete a product by ID
  deleteProduct(id: any): Observable<any> {
    let API_URL = `${this.MOCK_URL}/delete-product/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders });
  }

  // Method to filter products by price range
  filterProductsByPrice(minPrice: number, maxPrice: number) {
    const filteredProducts = this.products.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
    this.productsFilteredSubject.next(filteredProducts);
    console.log(this.minPrice)
  }
}
