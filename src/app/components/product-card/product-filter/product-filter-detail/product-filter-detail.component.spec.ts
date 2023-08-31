import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterDetailComponent } from './product-filter-detail.component';

describe('ProductFilterDetailComponent', () => {
  let component: ProductFilterDetailComponent;
  let fixture: ComponentFixture<ProductFilterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFilterDetailComponent]
    });
    fixture = TestBed.createComponent(ProductFilterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
