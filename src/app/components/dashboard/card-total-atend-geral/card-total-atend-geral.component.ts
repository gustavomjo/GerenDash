import { LoginComponent } from './../../login/login.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { globalData } from '../../../global/global-data';
import { getMonth, getYear } from 'date-fns';
import { lpad } from '../../../global/global-string';
import { searchIco } from '../../../global/global-icons';
import { CommonModule } from '@angular/common';
import { tot_atend_clinica_medico_dia } from '../../../models/dashboard/tot-atend-clinica-medico-dia.model';

@Component({
  selector: 'app-card-total-atend-geral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-total-atend-geral.component.html',
  styleUrl: './card-total-atend-geral.component.scss',
  encapsulation: ViewEncapsulation.None // Desativa o encapsulamento de estilos

})
export class CardTotalAtendGeralComponent implements OnInit {
  cardTotalAtendGeral: tot_atend_clinica_medico_dia[] = [];
  groupedMedico: { [key: string]: { medico: string; total: number; items: tot_atend_clinica_medico_dia[] } } = {};
  totalGeral: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTotAtendClinicaMedicoDia();
  }

  async getTotAtendClinicaMedicoDia() {
    (await this.dashboardService.getTotAtendClinicaMedicoDia(globalVars.cookieValue)).subscribe({
      next: (response) => {
        if (response && response.body) {
          this.cardTotalAtendGeral = response.body;
          this.aggregateData();
          this.calculateSlideTrackWidth(); // Recalcula a largura da pista de deslizamento
        } else {
          console.error('A resposta não contém os dados esperados:', response);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar dados de atendimentos:', err);
      },
    });
  }

  aggregateData() {
    const mesAnoAtual = `${globalData.gbAno}-${lpad(String(Number(globalData.gbMes_atual)), 2, '0')}`;
    this.totalGeral = 0;

    this.groupedMedico = this.cardTotalAtendGeral.reduce((acc: any, item) => {
      const medico = item.nome_medico;
      const mesAnoBd = `${getYear(item.data_agenda)}-${lpad(String(Number(getMonth(item.data_agenda)) + 1), 2, '0')}`;

      if (mesAnoBd === mesAnoAtual) {
        if (!acc[medico]) {
          acc[medico] = { medico, total: 0, items: [] };
        }

        acc[medico].items.push(item);
        acc[medico].total += item.total;
        this.totalGeral += item.total;
      }
      return acc;
    }, {});
  }

  calculateSlideTrackWidth() {
    const itemCount = Object.keys(this.groupedMedico).length;
    document.documentElement.style.setProperty('--number-of-items', itemCount.toString());
  }

  getMedicoIcon(medico: string): string {
    // console.log(searchIco(medico))
    return searchIco(medico);
  }

  shouldSlide(): boolean {
    return Object.keys(this.groupedMedico).length > 6;
  }
}
