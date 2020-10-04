import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  fazerLogin(usuario: Usuario) {

    this.http.post<any>(AppConstants.baseLogin, usuario).subscribe(data => {

      let token = data.token;

      sessionStorage.setItem("token", token);
      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    }, error => {
      console.error("Erro ao fazer login");
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    })
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
