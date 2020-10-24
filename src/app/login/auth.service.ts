import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { MessageService } from 'primeng/api';
import { MensagemUtil } from '../utils/mensagem.util';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { RolesEnum } from '../utils/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  usuarioAutenticado = new EventEmitter<boolean>();

  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router, private http: HttpClient,
    private messageService: MessageService,) {
      this.usuarioAutenticado.emit(this.usuarioEstaAutenticado());
     }

  fazerLogin(usuario: Usuario) {

    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.http.post<any>(AppConstants.baseLogin, usuario)
    .pipe(finalize(() => this.blockUI.stop()))
    .subscribe(data => {

      let token = data.token;

      localStorage.setItem("token", token);

      this.usuarioAutenticado.emit(true);

      if (this.hasHole([RolesEnum.CLIENTE])) {
        this.router.navigate(['/minhas-dividas']);
      } else {
        this.router.navigate(['/usuario']);
      }

    }, error => {
      this.messageService.add({severity:'error', summary: MensagemUtil.ERRO, detail: error});
      this.usuarioAutenticado.emit(false);
    })
  }

  usuarioEstaAutenticado() {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null && this.naoExpirou()) {
      return true;
    } else {
      return false;
    }
  }

  naoExpirou() {
    let token = localStorage.getItem('token');
    let exp = JSON.parse(atob(token.split(".")[1])).exp;
    return exp >= new Date().getTime() / 1000;
  }

  public decodePayloadJWT(): any {
    let token = localStorage.getItem('token');
    return JSON.parse(atob(token.split(".")[1]));
  }

  public getRoles(): string[] {
    return this.decodePayloadJWT().ROLES;
  }

  public hasHole(roles: string[]): boolean {
    let usuarioRoles = this.getRoles();

    return  usuarioRoles.filter(role => roles.includes(role)).length > 0;

  }
}
