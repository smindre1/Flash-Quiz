import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCardSetComponent } from './display-card-set.component';

describe('DisplayCardSetComponent', () => {
  let component: DisplayCardSetComponent;
  let fixture: ComponentFixture<DisplayCardSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCardSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
