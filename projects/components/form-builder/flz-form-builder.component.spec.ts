import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlzFormBuilderComponent } from './flz-form-builder.component';

describe('FlzFormBuilderComponent', () => {
  let component: FlzFormBuilderComponent;
  let fixture: ComponentFixture<FlzFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlzFormBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlzFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
