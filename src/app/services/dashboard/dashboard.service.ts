import { CookieService } from './../../cookie.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { tot_atend_clinica_medico_dia } from '../../models/dashboard/tot-atend-clinica-medico-dia.model';
import { Busca } from '../../global/globals.services';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = '';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private Busca : Busca
  ) {
    this.configService.getConfig().subscribe(config => {
      this.url = config.servidor;
    });
  }

  async getTotAtendClinicaMedicoDia(chave: string) {
    // console.log(this.url)
    return await this.Busca.getHtml<tot_atend_clinica_medico_dia[]>(`/getTotAtendClinicaMedicoDia/${chave}`);



    // return this.httpClient.get<tot_atend_clinica_medico_dia[]>(`${this.url}/getTotAtendClinicaMedicoDia/${chave}`);
  }

}
