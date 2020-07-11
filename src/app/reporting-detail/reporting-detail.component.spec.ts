import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingDetailComponent } from './reporting-detail.component';

describe('ReportingDetailComponent', () => {
  let component: ReportingDetailComponent;
  let fixture: ComponentFixture<ReportingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
