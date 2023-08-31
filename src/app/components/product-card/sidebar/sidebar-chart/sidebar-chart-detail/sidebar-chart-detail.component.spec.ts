import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarChartDetailComponent } from './sidebar-chart-detail.component';

describe('SidebarChartDetailComponent', () => {
  let component: SidebarChartDetailComponent;
  let fixture: ComponentFixture<SidebarChartDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarChartDetailComponent]
    });
    fixture = TestBed.createComponent(SidebarChartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
