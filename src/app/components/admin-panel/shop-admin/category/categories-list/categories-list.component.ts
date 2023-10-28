import {
  AfterViewInit,
  Component,
  NgZone,
  ViewChild,
} from '@angular/core';
import { CategoryService } from '../../../../../services/category.service';
import { FormGroup } from '@angular/forms';
import { Supplier } from '../../../../../models/supplier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductService } from '../../../admin-panel.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../../../models/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'category_name', 'edit'];
  dataSource: any;
  getId: any;
  updateForm!: FormGroup;
  Categories: any = [];

  suppliers: Supplier[] = [];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoryCrudService: CategoryService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private supplierService: AdminProductService
  ) {
    this.dataSource = new MatTableDataSource<Category>();
  }

  ngAfterViewInit() {
    this.loadCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCategories() {
    this.categoryCrudService.GetCategories().subscribe((res) => {
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

  vm$ = this.supplierService.suppliers$;

  onUpdate(): any {
    this.categoryCrudService
      .updateCategory(this.getId, this.updateForm.value)
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
      this.categoryCrudService.deleteCategory(id).subscribe((res) => {
        this.Categories.splice(i, 1);
      });
    }
    this.ngZone.run(() => this.router.navigateByUrl('/admin-panel'));
  }
}
