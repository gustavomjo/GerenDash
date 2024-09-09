import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTotAtendClinicaMedicoDiaComponent } from './card-tot-atend-clinica-medico-dia.component';

describe('CardTotAtendClinicaMedicoDiaComponent', () => {
  let component: CardTotAtendClinicaMedicoDiaComponent;
  let fixture: ComponentFixture<CardTotAtendClinicaMedicoDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTotAtendClinicaMedicoDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTotAtendClinicaMedicoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
