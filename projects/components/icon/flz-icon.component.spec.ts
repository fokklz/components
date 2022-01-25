import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlzIconComponent } from './flz-icon.component';

describe('FlzIconComponent', () => {
  let component: FlzIconComponent;
  let fixture: ComponentFixture<FlzIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlzIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlzIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
