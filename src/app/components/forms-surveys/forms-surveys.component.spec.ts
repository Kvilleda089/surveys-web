import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSurveysComponent } from './forms-surveys.component';

describe('FormsSurveysComponent', () => {
  let component: FormsSurveysComponent;
  let fixture: ComponentFixture<FormsSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
