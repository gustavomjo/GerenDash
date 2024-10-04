import { Component } from '@angular/core';
import { CardTotAtendClinicaMedicoDiaComponent } from "./card-tot-atend-clinica-medico-dia/card-tot-atend-clinica-medico-dia.component";
import { CardTotalAtendGeralComponent } from "./card-total-atend-geral/card-total-atend-geral.component";

import { CookieService } from '../../services/cookie.service';
import { globalVars } from '../../global/globalVars';
import { AtendMapaCalorSemanaComponent } from "./atend-mapa-calor-semana/atend-mapa-calor-semana.component";
import { AtendMapaCalorHorarioComponent } from "./atend-mapa-calor-horario/atend-mapa-calor-horario.component";
import { CardTotalAtendimentoComponent } from "./card-total-atendimento/card-total-atendimento.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardTotAtendClinicaMedicoDiaComponent, CardTotalAtendGeralComponent, AtendMapaCalorSemanaComponent, AtendMapaCalorHorarioComponent, CardTotalAtendimentoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private cookieService: CookieService,

  ) {
    globalVars.cookieValue = this.cookieService.getCookie('ck_chave') || '';
  }

}
