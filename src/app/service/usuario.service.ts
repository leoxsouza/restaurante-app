import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Usuario } from '../login/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post( AppConstants.baseUrl, usuario );
  }

  findOne( id: number): Observable<any> {
    return this.http.get(`${AppConstants.baseUrl}${id}`);
  }

  excluirUsuario( id: number ) {
    return this.http.delete(`${AppConstants.baseUrl}${id}`);
  }
}
