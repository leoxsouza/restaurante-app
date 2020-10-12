import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { CompraCliente } from '../model/compra-cliente';

@Injectable({
  providedIn: 'root'
})
export class CompraClienteService {

  resourceUrl = `${AppConstants.apiUrl}/compras-cliente/`;

  constructor(private http: HttpClient) { }

  salvar(compraCliente: CompraCliente): Observable<any> {
    return this.http.post( this.resourceUrl, compraCliente );
  }

}
