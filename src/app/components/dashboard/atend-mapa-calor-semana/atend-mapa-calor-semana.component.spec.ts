import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendMapaCalorSemanaComponent } from './atend-mapa-calor-semana.component';

describe('AtendMapaCalorSemanaComponent', () => {
  let component: AtendMapaCalorSemanaComponent;
  let fixture: ComponentFixture<AtendMapaCalorSemanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendMapaCalorSemanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendMapaCalorSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
