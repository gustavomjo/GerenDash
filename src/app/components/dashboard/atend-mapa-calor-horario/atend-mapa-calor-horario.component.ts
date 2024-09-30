import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-atend-mapa-calor-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atend-mapa-calor-horario.component.html',
  styleUrl: './atend-mapa-calor-horario.component.scss'
})
export class AtendMapaCalorHorarioComponent implements OnInit {
  mapa:any[]=[];
  constructor(
    private Dashboard: DashboardService
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAtendMapaCalorHorario();
  }

  async getAtendMapaCalorHorario() {
    (await this.Dashboard.getAtendMapaCalorHorario(globalVars.cookieValue)).subscribe(dados => {
      // Atualiza o mapa com os dados recebidos
      this.mapa = this.mapa.concat(dados.body)
      let horarios: any[] = [];
      let dataset: any[] = [{
        label: 'Total de Atendimentos',
        data: [],
        backgroundColor: '#36a2eb10',
        borderColor: '#107ef4',
        borderWidth: 1
      }];

      // Popula os arrays com os dados necessários
      for (let i = 0; i < this.mapa.length; i++) {
        horarios.push(this.mapa[i].hora_agenda);
        dataset[0].data.push(this.mapa[i].total);

      }

      // Chama a função de renderizar o gráfico após ter os dados prontos
      this._chart(horarios, dataset);
    });
  }
  _chart(horarios:any,dataset:any){
    let chartExist = Chart.getChart("cMapaHorario"); // <canvas> id
    if (chartExist) chartExist.destroy(); // Destrói o gráfico existente, se houver

    const myChart = new Chart("cMapaHorario", {
      type: 'radar',
      data: {
        labels: horarios, // Os horários dos atendimentos
        datasets: dataset // Conjunto de dados formatado corretamente
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Mapa de calor dos próximos atendimentos'
          }
        },
        scales: {
          r: { // Ajuste para o gráfico de radar
            beginAtZero: true
          }
        }
      }
    });
  }

}
