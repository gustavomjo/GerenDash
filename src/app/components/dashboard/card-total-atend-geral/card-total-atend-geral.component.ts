import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { globalVars } from '../../../global/globalVars';
import { globalData } from '../../../global/global-data';
import { getMonth, getYear } from 'date-fns';
import { lpad } from '../../../global/global-string';

@Component({
  selector: 'app-card-total-atend-geral',
  standalone: true,
  imports: [],
  templateUrl: './card-total-atend-geral.component.html',
  styleUrl: './card-total-atend-geral.component.scss'
})
export class CardTotalAtendGeralComponent implements OnInit {
  CardTotalAtendGeral : any[]=[];
  total : string = '';
  constructor(
    private Dashboard: DashboardService
  ) { }
  ngOnInit(): void {
    this.getTotAtendClinicaMedicoDia();
  }

  async getTotAtendClinicaMedicoDia() {
    (await this.Dashboard.getTotAtendClinicaMedicoDia(globalVars.cookieValue)).subscribe(dados => {
      this.CardTotalAtendGeral = this.CardTotalAtendGeral.concat(dados.body);
      let mes_ano_atual = globalData.gbAno + '-' + globalData.gbMes_atual;
      let t : number = 0;
      this.CardTotalAtendGeral.forEach((c) => {
        let mes_ano_bd = getYear(c.data_agenda) + '-' + lpad(String(Number(getMonth(c.data_agenda) + 1)), 2, '0');
        if (mes_ano_bd === mes_ano_atual)
          t = t+ Number(c.total);

      });
      this.total = String(t);

    });
  }

}
