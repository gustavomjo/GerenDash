import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { total_atendimento } from '../../../models/dashboard/total-atendimento.model';
import { globalData } from '../../../global/global-data';
import { similarityPercentage } from '../../../global/global-string';
import { searchIco, searchIcoColor } from '../../../global/global-icons';




@Component({
  selector: 'app-card-total-atendimento',
  standalone: true,
  imports: [],
  templateUrl: './card-total-atendimento.component.html',
  styleUrls: ['./card-total-atendimento.component.scss'],
  encapsulation: ViewEncapsulation.None // Desativa o encapsulamento de estilos
})
export class CardTotalAtendimentoComponent implements OnInit,AfterViewInit {
  cardTotalAtend: any[] = [];

  constructor(private Dashboard: DashboardService) {}
  ngAfterViewInit(): void {
    this.getTotalAtendimentos()
  }

  ngOnInit(): void {


  }
  public showUpdates: boolean = false; // Estado para controlar a visibilidade dos updates
  public buttonText: string = "Show all Updates"; // Texto do botão
  public lineHeight: string = "350px"; // Altura inicial da linha

  toggleUpdates(): void {
    this.showUpdates = !this.showUpdates; // Alterna o estado
    this.lineHeight = this.showUpdates ? "570px" : "350px"; // Ajusta a altura da linha
    this.buttonText = this.showUpdates ? "Show less" : "Show all Updates"; // Atualiza o texto do botão
  }

  async getTotalAtendimentos() {
    (await this.Dashboard.getTotalAtendimentos(globalVars.cookieValue)).subscribe(dados => {
      // Atualiza o mapa com os dados recebidos
      this.cardTotalAtend = this.cardTotalAtend.concat(dados.body);
      let list : any[]=[];

      //montando a lista
      for(let i=0;i<this.cardTotalAtend.length;i++){
        let similarItem = null;
        for (let j = 0; j < list.length; j++) {
          //debug para verificar a similiaridade de palavras
          // if(list[j].tipo === "CONSULTA PARTICULAR MATHEUS BACILA"){
          //   console.log(list[j].tipo)
          //   console.log(this.cardTotalAtend[i].tipo)
          //   console.log(similarityPercentage(list[j].tipo, this.cardTotalAtend[i].tipo))
          // }
          if (similarityPercentage(list[j].tipo, this.cardTotalAtend[i].tipo) > 40) {
            similarItem = list[j];
            break;
          }
        }
        if (similarItem) {
          if (this.cardTotalAtend[i].ano === globalData.gbAno) {
            similarItem.total_atual += this.cardTotalAtend[i].total;
          } else {
            similarItem.total_passado += this.cardTotalAtend[i].total;
          }
        }
        else {
          if (this.cardTotalAtend[i].ano === globalData.gbAno) {
            list.push({
              tipo: this.cardTotalAtend[i].tipo,
              total_atual: this.cardTotalAtend[i].total,
              total_passado: 0
            });
          } else {
            list.push({
              tipo: this.cardTotalAtend[i].tipo,
              total_atual: 0,
              total_passado: this.cardTotalAtend[i].total
            });
          }
        }
      }

      const gridsContainer = document.getElementById('grids');

      if (gridsContainer) {
        // Montando os cards
        list.forEach((lst) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-12 col-lg-6 p-0';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card mb-0 shadow-sm card-total-atendimento';

            const cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';

            const dFlexDiv = document.createElement('div');
            dFlexDiv.className = 'd-flex align-items-center';

            const iconWrapperDiv = document.createElement('div');
            iconWrapperDiv.className = 'icon-wrapper rounded-circle me-3';
            iconWrapperDiv.style.backgroundColor = searchIcoColor(lst.tipo);

            const iconElement = document.createElement('i');
            iconElement.className = searchIco(lst.tipo);
            iconElement.style.color = '#FFF';

            const widgetContentDiv = document.createElement('div');
            widgetContentDiv.className = 'widget-content';

            const widgetSubheadingP = document.createElement('h6');
            widgetSubheadingP.className = 'widget-subheading mb-1';
            widgetSubheadingP.textContent = lst.tipo;

            const widgetNumbersH3 = document.createElement('h3');
            widgetNumbersH3.className = 'widget-numbers mb-1';
            widgetNumbersH3.textContent = lst.total_atual;

            const porcent = (lst.total_atual * 100) / lst.total_passado;

            const widgetSubheadingH6 = document.createElement('p');
            widgetSubheadingH6.className = 'widget-subheading';
            widgetSubheadingH6.textContent = porcent.toFixed(2) + '%';
            switch(true){
              case (porcent < 50):
                widgetSubheadingH6.style.color = '#E91E63';
                break;
              case (porcent >= 50 && porcent < 100):
                widgetSubheadingH6.style.color = '#F44336';
                break;
              case (porcent >=100):
                widgetSubheadingH6.style.color = '#4CAF50';
                break;

            }
            // Monta a estrutura hierárquica
            iconWrapperDiv.appendChild(iconElement);
            dFlexDiv.appendChild(iconWrapperDiv);
            dFlexDiv.appendChild(widgetContentDiv);

            widgetContentDiv.appendChild(widgetSubheadingP);
            widgetContentDiv.appendChild(widgetNumbersH3);
            widgetContentDiv.appendChild(widgetSubheadingH6);

            cardBodyDiv.appendChild(dFlexDiv);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);

            // Adiciona o card à div com o ID 'grids'
            gridsContainer.appendChild(colDiv);
          });
      } else {
          console.error("Div with ID 'grids' not found.");
      }




      // Ajuste a altura dos cards
      // const cards: NodeListOf<Element> = document.querySelectorAll('.card-total-atendimento');
      // let maxHeight = 0;
      // cards.forEach((card,i) => {
      //     const cardElement = card as HTMLElement; // Asserção de tipo para HTMLElement
      //     const cardHeight = cardElement.offsetHeight; // Agora TypeScript reconhece offsetHeight
      //     if (cardHeight > maxHeight) {
      //         maxHeight = cardHeight;
      //     }
      // });

      // cards.forEach(card => {
      //     const cardElement = card as HTMLElement; // Asserção de tipo novamente
      //     cardElement.style.height = maxHeight + 'px';
      // });
    });
  }
}
