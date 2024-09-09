import { Component } from '@angular/core';
import { CardTotAtendClinicaMedicoDiaComponent } from "./card-tot-atend-clinica-medico-dia/card-tot-atend-clinica-medico-dia.component";
import { CardTotalAtendGeralComponent } from "./card-total-atend-geral/card-total-atend-geral.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardTotAtendClinicaMedicoDiaComponent, CardTotalAtendGeralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
