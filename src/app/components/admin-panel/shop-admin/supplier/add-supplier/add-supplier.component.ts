import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SupplierService } from "../../../../../services/supplier.service";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private supplierCrudService: SupplierService
  ) {
    this.supplierForm = this.formBuilder.group( {
      id: [''],
      _id: [''],
      supplier_name: [''],
      supplier_description: [''],
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.supplierCrudService.AddSupplier(this.supplierForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/admin-panel/suppliers-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
