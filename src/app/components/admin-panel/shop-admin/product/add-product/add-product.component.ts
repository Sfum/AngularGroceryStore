import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  asyncFilterPipe$ = this.productService.filteredProducts$
  selectedSupplierId: number | undefined;
  selectedCategoryId: number | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      _id: [''],
      product_name: [''],
      supplierId: [''],
      categoryId: [''],
      reviewId: [''],
      catalogue_number: [''],
      short_description: [''],
      long_description: [''],
      product_image: [''],
      price: [''],
      availability: [''],
      quantity: [''],
      in_wishlist: [''],
      in_compare: [''],
      in_cart: [''],
      made_in_country: [''],
      on_sale: [''],
      climate_friendly: [''],
      delivery_slot: [''],
      price_per_weight: [''],
      diet_type: [''],
      size: [''],
      number_of_items: [''],
      format: [''],
      type: [''],
      flavour: [''],
    });
  }
  optionSupplierSelected(selectedSupplierId: number) {
    return this.productService.optionSupplierSelected(selectedSupplierId);
  }

  optionCategorySelected(selectedCategoryId: number) {
    return this.productService.onChangedCategory(selectedCategoryId);
  }

  onSubmit(): any {
    this.productService.AddProduct(this.productForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
      },
      (err) => {
        console.log('Crap! Failed!');
        console.log(err);
      }
    );
    this.ngZone.run(() => this.router.navigateByUrl('/admin-panel'));
  }
}
