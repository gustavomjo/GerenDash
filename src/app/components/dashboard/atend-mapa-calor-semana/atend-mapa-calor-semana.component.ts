import { LoginComponent } from './../../login/login.component';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);

@Component({
  selector: 'app-atend-mapa-calor-semana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atend-mapa-calor-semana.component.html',
  styleUrl: './atend-mapa-calor-semana.component.scss',
  encapsulation: ViewEncapsulation.None  // Desativa o encapsulamento de estilos
})
export class AtendMapaCalorSemanaComponent implements OnInit,AfterViewInit {
  mapa : any[]=[];
  showPanel = true;
  constructor(
    private Dashboard: DashboardService
  ) { }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getAtendMapaCalorSemana();
  }
  chart: Chart | undefined;


  async getAtendMapaCalorSemana() {
    (await this.Dashboard.getAtendMapaCalorSemana(globalVars.cookieValue)).subscribe(dados => {
      // Concatena os dados recebidos ao mapa atual
      this.mapa = this.mapa.concat(dados.body);
      // Semana como labels do gráfico
      // console.log(this.mapa)

      // Definição da semana
        const semana = [ 'Domingo', 'Segunda-feira', 'Terca-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];

        // Criando o objeto agrupado por 'nome_medico'
        const groupedData = this.mapa.reduce((acc: any, item) => {
          const medico = item.nome_medico.trim(); // Remove espaços em branco do nome do médico
          const diaSemana = item.nome_dia_semana.trim(); // Remove espaços em branco do nome do dia da semana

          if (!acc[medico]) {
            acc[medico] = [];
          }
          acc[medico].push({
            ...item,
            nome_dia_semana: diaSemana // Remove espaços em branco do nome do dia da semana
          });
          return acc;
        }, {});

        // Iterando sobre cada médico
        Object.keys(groupedData).forEach(medico => {
          const items = groupedData[medico];

          // Cria um conjunto com os dias da semana presentes para o médico atual
          const diasPresentes = new Set(items.map((item: { nome_dia_semana: string }) => item.nome_dia_semana));

          // Adiciona os dias da semana ausentes
          semana.forEach(dia => {
            const trimmedDia = dia.trim(); // Remove espaços em branco do dia

            if (!diasPresentes.has(trimmedDia)) {
              // Adiciona um novo item com o dia ausente
              items.push({
                nome_dia_semana: trimmedDia,
                nome_medico: medico,
                dia_semana: semana.indexOf(trimmedDia),
                total_contador: 0 // Valor padrão para 'total_contador'
              });
            }
          });

          // Ordena os itens conforme a semana
          groupedData[medico] = items.sort((a: { dia_semana: number }, b: { dia_semana: number }) => a.dia_semana - b.dia_semana);
        });

      // Criando datasets dinâmicos para o Chart.js
      const arraysDinamicos = Object.keys(groupedData).map((medico,i) => {
        return {
          label: medico, // Nome do médico
          data: groupedData[medico].map((atendimento: any) => atendimento.total_contador), // Somente os valores de atendimento (sum)
          backgroundColor: globalCores.gbCores[i], // Cor de fundo
          borderColor: globalCores.gbCores[i], // Cor da borda
          borderWidth: 1, // Largura da borda
        };
      });




      // Chamando a função para gerar o gráfico
      // console.log(arraysDinamicos)
      this._chart(semana, arraysDinamicos);
    });
  }

  _chart(labels: any, datasets: any) {
    let chartExist = Chart.getChart("_chart"); // <canvas> id
    if (chartExist != undefined) chartExist.destroy();

    const myChart = new Chart("_chart", {
      type: 'bar',
      data: {
        labels: labels, // Os dias da semana
        datasets: datasets // Os conjuntos de dados dinamicamente criados
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Atendimentos por Dia da Semana'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }




}

/*ABAIXO TEM UM MAPA DE CALOR COMO SE FOSSE DO GIT HUB
MAS NAO GOSTEI PARA UM DASHBOARD, MAS TEM MUITOS ESTUDOS BONS*/

// async getAtendMapaCalorSemana() {
//   (await this.Dashboard.getAtendMapaCalorSemana(globalVars.cookieValue)).subscribe(dados => {
//     // Concatena os dados recebidos ao mapa atual
//     this.mapa = this.mapa.concat(dados.body);
//     const item = document.getElementById('item');

//     // Função para criar um item com legenda ou quadrado
//     function createItem(label: string, sum: number, total: number, tipo: string) {
//       const container = document.createElement('div');
//       container.classList.add('item-container');

//       const itemLabel = document.createElement('div');
//       itemLabel.classList.add('item-label', 'space');
//       itemLabel.textContent = label.charAt(0); // Define a legenda com a primeira letra do dia

//       let porcent = (sum * 100) / total;
//       porcent = Math.min(Math.max(porcent, 0), 100); // Garante que porcent esteja entre 0 e 100

//       const itemContent = document.createElement('div');

//       itemContent.classList.add('quadrado');
//       itemContent.style.backgroundColor = `rgba(0, 169, 80, ${porcent / 100})`;

//       if (tipo != 'cab') {
//       // Cria o painel (tooltip)
//         const panel = document.createElement('div');
//         panel.className = 'panel';
//         panel.textContent = `Consultas ${label} : ${sum}`;
//         // Adiciona o painel ao container
//         container.appendChild(panel);
//       }

//       // Define se deve adicionar legenda ou quadrado
//       if (tipo === 'cab') {
//         container.appendChild(itemLabel); // Se for do tipo 'cab', adiciona a legenda
//       } else {
//         container.appendChild(itemContent); // Caso contrário, adiciona o quadrado com a cor
//       }

//       return container;
//     }

//     // Agrupa dados por nome_medico
//     const groupedData = this.mapa.reduce((acc: any, item) => {
//       if (!acc[item.nome_medico]) {
//         acc[item.nome_medico] = [];
//       }
//       acc[item.nome_medico].push(item);
//       return acc;
//     }, {});

//     // Encontra o maior nome
//     const nomesMedicos = Object.keys(groupedData);
//     // console.log(groupedData)
//     const maiorNome = nomesMedicos.reduce((a, b) => a.length > b.length ? a : b);

//     // Cria um elemento temporário para medir a largura do maior nome
//     const tempDiv = document.createElement('div');
//     tempDiv.style.position = 'absolute';
//     tempDiv.style.visibility = 'hidden';
//     tempDiv.style.whiteSpace = 'nowrap'; // Evita quebra de linha
//     tempDiv.innerText = maiorNome;
//     document.body.appendChild(tempDiv);


//     // Calcula a largura do maior nome
//     const larguraMaiorNome = tempDiv.offsetWidth + 10;

//     // Remove o elemento temporário
//     document.body.removeChild(tempDiv);

//     // Obtém o contêiner 'heatmap'
//     const heatmap = document.getElementById('heatmap') as HTMLElement;
//     heatmap.innerHTML = '';

//     // Criando o cabeçalho
//     const cab = document.createElement('div');
//     cab.classList.add('line');
//     const p = document.createElement('div');
//     p.classList.add('medico');
//     p.style.width = `${larguraMaiorNome}px`;
//     cab.appendChild(p);

//     ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].forEach(dia => cab.appendChild(createItem(dia, 0, 0, 'cab')));
//     heatmap.appendChild(cab);

//     // Cria e adiciona os itens agrupados ao contêiner
//     for (const nome_medico in groupedData) {
//       if (Object.prototype.hasOwnProperty.call(groupedData, nome_medico)) {
//         const medico = document.createElement('div');
//         medico.innerHTML = `<p>${nome_medico}</p>`;
//         medico.classList.add('medico');
//         medico.style.width = `${larguraMaiorNome}px`; // Define a largura com base no maior nome

//         const line = document.createElement('div');
//         line.classList.add('line');
//         line.appendChild(medico);

//         const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

//         const total = groupedData[nome_medico].reduce((sum: number, data: any) => sum + data.sum, 0);

//         days.forEach(day => {
//           const dayData = groupedData[nome_medico].find((data: any) => data.nome_dia_semana === day);
//           const sum = dayData ? dayData.sum : 0;
//           line.appendChild(createItem(day, sum, total, 'corpo'));
//         });

//         heatmap.appendChild(line);
//       }
//     }
//   });
// }
