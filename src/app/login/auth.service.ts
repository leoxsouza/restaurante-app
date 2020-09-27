import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  fazerLogin(usuario: Usuario) {

    this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      let token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);

      console.log("Token: " + localStorage.getItem("token"))
    }, error => {
      console.error("Erro ao fazer login");
    })

    if (usuario.login === 'leo' && usuario.senha === '123') {
      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);
    } else {

      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

  }
}
