import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private categoryCrudService: CategoryService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.categoryCrudService.GetCategory(this.getId).subscribe((category) => {
      this.updateForm.patchValue({
        id: category['id'],
        _id: category['_id'],
        category_name: category['category_name'],
      });
    });

    this.updateForm = this.formBuilder.group({
      _id: [''],
      id: [''],
      category_name: [''],
    });
  }

  ngOnInit() {}

  onUpdate(): any {
    this.categoryCrudService
      .updateCategory(this.getId, this.updateForm.value)
      .subscribe(
        () => {
          if (window.confirm('Update this selection?'))
            this.ngZone.run(() =>
              this.router.navigateByUrl('/admin-panel/categories-list')
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
