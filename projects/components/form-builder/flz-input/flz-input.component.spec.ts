import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlzInputComponent } from './flz-input.component';

describe('FlzInputComponent', () => {
  let component: FlzInputComponent;
  let fixture: ComponentFixture<FlzInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlzInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlzInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
