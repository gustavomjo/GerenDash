import { Component, OnInit } from '@angular/core';
import { CookieService } from './../../../cookie.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { globalData } from '../../../global/global-data';
import { getMonth, getYear, getDay } from 'date-fns';
import { lpad } from '../../../global/global-string';
import { Chart, registerables } from 'chart.js';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);

@Component({
  selector: 'app-card-tot-atend-clinica-medico-dia',
  standalone: true,
  imports: [],
  templateUrl: './card-tot-atend-clinica-medico-dia.component.html',
  styleUrl: './card-tot-atend-clinica-medico-dia.component.scss'
})
export class CardTotAtendClinicaMedicoDiaComponent implements OnInit{
  card : any[]=[];

  constructor(
    private cookieService: CookieService,
    private Dashboard: DashboardService
  ) {
    globalVars.cookieValue = this.cookieService.getCookie('ck_chave') || '';
  }
  ngOnInit(): void {
    this.getTotAtendClinicaMedicoDia();
  }

  chart: Chart | undefined;

  async getTotAtendClinicaMedicoDia() {
    (await this.Dashboard.getTotAtendClinicaMedicoDia(globalVars.cookieValue)).subscribe(dados => {
      this.card = this.card.concat(dados.body);

      let mes_ano_atual = globalData.gbAno + '-' + globalData.gbMes_atual;
      let mes_ano_passado = Number(globalData.gbAno - 1) + '-' + globalData.gbMes_atual;
      let lstMesAnoAtual: any[] = [];
      let lstMesAnoPassado: any[] = [];
      let diasComum: any[] = [];
      const cores: string[] = globalCores.gbCoresTransp;

      const diasComumSet = new Set<number>();

      this.card.forEach((c) => {
        let mes_ano_bd = getYear(c.data_agenda) + '-' + lpad(String(Number(getMonth(c.data_agenda) + 1)), 2, '0');
        let diaFormatado = globalData.convertToDiaMes(c.data_agenda);

        // Verifica se o mês e ano são os esperados e adiciona a data formatada se ainda não estiver presente
        if (mes_ano_bd === mes_ano_passado || mes_ano_bd === mes_ano_atual) {
          // console.log(c.data_agenda)
          // Transformando a data que vem do banco para Date
          const dataAgenda = new Date(c.data_agenda);

          // Colocando tudo no mesmo ano para depois ordenar corretamente
          let dt = new Date('2024-' + (dataAgenda.getMonth() + 1) + '-' + dataAgenda.getDate());

          // Verificando se já existe na lista
          if (!diasComum.some(existingItem => existingItem.label.getTime() === dt.getTime())) {
            diasComum.push({ label: dt });
          }

          switch (mes_ano_bd) {
            case mes_ano_passado:

              //verificando se a data ja esta inclusa na lista;
              const existingItem = lstMesAnoPassado.find(
                (item) => item.label.getTime() === dt.getTime()
              );

              if (existingItem) {
                // Atualizando o valor de data, somando o total atual
                existingItem.data = existingItem.data.map((value: number, index: number) =>
                  index === 0 ? value + c.total : value
                );
              } else {
                // Adicionando um novo item ao array
                lstMesAnoPassado.push({
                  label: dt,
                  data: [c.total],
                  backgroundColor: cores[1],
                  borderColor: cores[1],
                  borderWidth: 1,
                });
              }

              break;
            case mes_ano_atual:
              //verificando se a data ja esta inclusa na lista;
              const existingItem_atual = lstMesAnoAtual.find(
                (item) => item.label.getTime() === dt.getTime()
              );

              if (existingItem_atual) {
                // Atualizando o valor de data, somando o total atual
                existingItem_atual.data = existingItem_atual.data.map((value: number, index: number) =>
                  index === 0 ? value + c.total : value
                );
              } else {
                // Adicionando um novo item ao array
                lstMesAnoAtual.push({
                  label: dt,
                  data: [c.total],
                  backgroundColor: cores[1],
                  borderColor: cores[1],
                  borderWidth: 1,
                });
              }
              break;
          }
        }
      });

      // Certificar que diasComum tem sempre objetos do tipo Date
      diasComum = diasComum.map(item => ({
        ...item,
        label: item.label instanceof Date ? item.label : new Date(item.label)
      }));

      // Ordenar os dias em comum
      diasComum.sort((a, b) => a.label.getTime() - b.label.getTime());

      // Adicionar datas ausentes nas listas
      diasComum.forEach(item => {
        if (!lstMesAnoPassado.some(existingItem => existingItem.label.getTime() === item.label.getTime())) {
          lstMesAnoPassado.push({
            label: item.label,
            data: [0],
            backgroundColor: cores[1],
            borderColor: cores[1],
            borderWidth: 1
          });
        }

        if (!lstMesAnoAtual.some(existingItem => existingItem.label.getTime() === item.label.getTime())) {
          if(globalData.gbDataHoje>=item.label)
          lstMesAnoAtual.push({
            label: item.label,
            data: [0],
            backgroundColor: cores[0],
            borderColor: cores[0],
            borderWidth: 1
          });
        }
      });
      lstMesAnoAtual.sort((a, b) => a.label.getTime() - b.label.getTime());
      lstMesAnoPassado.sort((a, b) => a.label.getTime() - b.label.getTime());

      this.createChart(lstMesAnoAtual, lstMesAnoPassado, diasComum);
    });
  }


  createChart(lstMesAnoAtual: any[], lstMesAnoPassado: any[], diasComum :any[]) {
    // Prepare os rótulos (datas) e os dados para o gráfico

    const labels = diasComum.map(item => globalData.convertToDiaMes(item.label)); // Assume que as datas são consistentes nos dois períodos
    const datasets = [
      {
        label: globalData.gbMeses[ Number(globalData.gbMes_atual)-1]+'/'+(globalData.gbAno-1),
        data: lstMesAnoPassado.map(item => item.data[0]),
        backgroundColor: globalCores.gbCoresTransp[1],
        borderColor: globalCores.gbCoresTransp[1],
        borderWidth: 1
      },
      {
        label: globalData.gbMeses[ Number(globalData.gbMes_atual)-1]+'/'+(globalData.gbAno),
        data: lstMesAnoAtual.map(item => item.data[0]), // Coletando os valores de data
        backgroundColor: globalCores.gbCoresTransp[0],
        borderColor: globalCores.gbCoresTransp[0],
        borderWidth: 1
      }

    ];

    // Destruir gráfico existente, se houver
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    // Inicialize o novo gráfico
    this.chart = new Chart('chartAtendClinicaMedicoDia', {
      type: 'line',
      data: {
        labels: labels, // Usar as datas como rótulos
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
