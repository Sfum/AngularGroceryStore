import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryService } from "../../../../../services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private categoryCrudService: CategoryService,
  )
  {

    this.categoryForm = this.formBuilder.group( {
      id: [''],
      _id: [''],
      category_name: [''],
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.categoryCrudService.AddCategory(this.categoryForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/admin-panel/categories-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
