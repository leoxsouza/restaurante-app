import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  resourceUrl = `${AppConstants.apiUrl}/produto`;

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<any> {
    return this.http.get<any>(this.resourceUrl);
  }

  salvar(produto: Produto): Observable<any> {
    return this.http.post( this.resourceUrl, produto );
  }

  findOne( id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`);
  }

  getProdutosDropdown(): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/dropdown`);
  }

}
