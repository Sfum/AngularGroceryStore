import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarChartComponent } from './sidebar-chart.component';

describe('SidebarChartComponent', () => {
  let component: SidebarChartComponent;
  let fixture: ComponentFixture<SidebarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarChartComponent]
    });
    fixture = TestBed.createComponent(SidebarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
