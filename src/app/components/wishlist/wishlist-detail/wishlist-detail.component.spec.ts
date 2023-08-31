import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistDetailComponent } from './wishlist-detail.component';

describe('WishlistDetailComponent', () => {
  let component: WishlistDetailComponent;
  let fixture: ComponentFixture<WishlistDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistDetailComponent]
    });
    fixture = TestBed.createComponent(WishlistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
