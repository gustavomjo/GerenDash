import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendMapaCalorHorarioComponent } from './atend-mapa-calor-horario.component';

describe('AtendMapaCalorHorarioComponent', () => {
  let component: AtendMapaCalorHorarioComponent;
  let fixture: ComponentFixture<AtendMapaCalorHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendMapaCalorHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendMapaCalorHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
