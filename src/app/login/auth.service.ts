import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { MessageService } from 'primeng/api';
import { MensagemUtil } from '../utils/mensagem.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  usuarioAutenticado = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient,
    private messageService: MessageService,) {
      this.usuarioAutenticado.emit(this.usuarioEstaAutenticado());
     }

  fazerLogin(usuario: Usuario) {

    this.http.post<any>(AppConstants.baseLogin, usuario).subscribe(data => {

      let token = data.token;

      localStorage.setItem("token", token);

      this.usuarioAutenticado.emit(true);

      this.router.navigate(['/']);

    }, error => {
      this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: MensagemUtil.ERRO_LOGIN});
      this.usuarioAutenticado.emit(false);
    })
  }

  usuarioEstaAutenticado() {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
