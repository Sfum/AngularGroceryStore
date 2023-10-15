import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import {SnackbarService} from "../../../../services/snackbar.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  Products: any = [];

  selectedSupplierId: number | undefined;
  selectedCategoryId: number | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private productCrudService: ProductService,
    private productService: ProductService,
    private snackBarService: SnackbarService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.productCrudService.GetProduct(this.getId).subscribe((product) => {
      this.updateForm.patchValue({
        _id: product['_id'],
        product_name: product['product_name'],
        supplierId: product['supplierId'],
        categoryId: product['categoryId'],
        reviewId: product['reviewId'],
        catalogue_number: product['catalogue_number'],
        short_description: product['short_description'],
        long_description: product['long_description'],
        product_image: product['product_image'],
        price: product['price'],
        availability: product['availability'],
        quantity: product['quantity'],
        in_wishlist: product['in_wishlist'],
        in_compare: product['in_compare'],
        in_cart: product['in_cart'],
        made_in_country: product['made_in_country'],
        on_sale: product['on_sale'],
        climate_friendly: product['climate_friendly'],
        delivery_slot: product['delivery_slot'],
        price_per_weight: product['price_per_weight'],
        diet_type: product['diet_type'],
        size: product['size'],
        number_of_items: product['number_of_items'],
        format: product['format'],
        type: product['type'],
        flavour: product['flavour'],
      });
    });

    this.updateForm = this.formBuilder.group({
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

  productEdit$ = this.productService.filteredProducts$;

  ngOnInit() {
    this.productEdit$.subscribe((res) => {
      this.Products = res;
    });
  }

  optionSupplierSelected(selectedSupplierId: number) {
    return this.productService.optionSupplierSelected(selectedSupplierId);
  }

  optionCategorySelected(selectedCategoryId: number) {
    return this.productService.onChangedCategory(selectedCategoryId);
  }

  onUpdate(): any {
    this.productCrudService
      .updateProduct(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          if (window.confirm('Update this selection?'))
              this.ngZone.run(() =>
              this.router.navigateByUrl('/products')        );
        },

        (err) => {
          console.log(err);
        }
      );
    this.snackBarService.showSnackbar(`Product Updated Successfully!`);

  }
}
