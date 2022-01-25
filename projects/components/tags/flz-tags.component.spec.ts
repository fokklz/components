import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlzTagsComponent } from './flz-tags.component';

describe('FlzTagsComponent', () => {
  let component: FlzTagsComponent;
  let fixture: ComponentFixture<FlzTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlzTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlzTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
