import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTotalAtendGeralComponent } from './card-total-atend-geral.component';

describe('CardTotalAtendGeralComponent', () => {
  let component: CardTotalAtendGeralComponent;
  let fixture: ComponentFixture<CardTotalAtendGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTotalAtendGeralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTotalAtendGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
