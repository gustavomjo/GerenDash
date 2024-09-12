import { globalVars } from './../../global/globalVars';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from '../../services/cookie.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { HttpClientModule } from '@angular/common/http'; // Importar o HttpClientModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Adicionar o HttpClientModule nos imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrigir a propriedade para "styleUrls"
})
export class LoginComponent implements OnInit {
  global = globalVars;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private LoginService: LoginService
  ) { }

  ngOnInit() {
    this.getCookie();
  }

  onLogin() {
    const usuario = document.getElementById('usuario') as HTMLInputElement;
    const senha = document.getElementById('senha') as HTMLInputElement;
    this.LoginService.getUser(globalVars.cookieValue,usuario.value.toUpperCase(),senha.value).subscribe(user=>{
      if(user.token != ''){
        this.LoginService.deslogar();
        this.LoginService.autorizar(user.token,usuario.value);
        console.log(this.LoginService.isLogged())
        this.router.navigate(['/dashboard']);
      }
    })

  }

  getCookie() {
    globalVars.cookieValue = this.cookieService.getCookie('ck_chave') || '';
  }

  onSubmitCookie() {
    const serverid = document.querySelector('#chave') as HTMLInputElement;
    this.LoginService.getChave(serverid.value).subscribe(servers => {
      console.log('Resposta completa:', servers); // Inspecione a resposta completa
      if (Array.isArray(servers) && servers.length > 0) {
        const server = servers[0];
        if (server.chave != '') {
          this.cookieService.setCookie('ck_chave', server.chave, 1);
          this.getCookie();
        }
      }
    });

  }
}
