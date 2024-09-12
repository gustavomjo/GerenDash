import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './../services/login/login.service';  // Importe o LoginService aqui
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,  // Injete o LoginService aqui
    private cookieService: CookieService,
    private router: Router
  ) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   if (this.loginService.isLogged()) {
  //     console.log('Usuário autenticado, permitindo acesso.');
  //     return true;
  //   } else {
  //     console.log('Usuário não autenticado, redirecionando para login.');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //falta realizar uma validação de token
    //esta validação é fraca.
    if (this.loginService.isLogged() && this.cookieService.getCookie('ck_chave')) {  // Use o userService aqui
      // console.log('Usuário autenticado, permitindo acesso.');
      return true;
    } else {
      // Redirecionar para a página de login ou página inicial
      this.router.navigate(['/login']);
      // console.log('Usuário não autenticado, redirecionando para login.');
      return false;
    }
  }
}
