import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTotalAtendimentoComponent } from './card-total-atendimento.component';

describe('CardTotalAtendimentoComponent', () => {
  let component: CardTotalAtendimentoComponent;
  let fixture: ComponentFixture<CardTotalAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTotalAtendimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTotalAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
