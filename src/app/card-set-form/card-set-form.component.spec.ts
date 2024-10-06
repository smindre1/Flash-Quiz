import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSetFormComponent } from './card-set-form.component';

describe('CardSetFormComponent', () => {
  let component: CardSetFormComponent;
  let fixture: ComponentFixture<CardSetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
