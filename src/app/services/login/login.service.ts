import { CookieService } from '../cookie.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { chave } from '../../models/chave.model';
import { user } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = '';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private ck : CookieService
  ) {
    this.configService.getConfig().subscribe(config => {
      this.url = config.servidor;
    });
  }

  getChave(chave: string) {
    // console.log(this.url)
    return this.httpClient.get<chave[]>(`${this.url}/getChave/${chave}`);
  }

  getUser(ck:string,user:string,senha:string){
    return this.httpClient.get<user>(this.url+'/getuser/'+ck+'/'+user+'/'+senha);
  }

  autorizar(token: string, user: string): void {
    if (token) {
      localStorage.setItem('login', 'sim');
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
    }
  }

  deslogar(){
    localStorage.clear();
  }


  isLogged = () => !! localStorage.getItem('login');
}
