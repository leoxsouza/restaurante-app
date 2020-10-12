import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class DividaClienteService {

  resourceUrl = `${AppConstants.apiUrl}/divida-cliente`;

  constructor(private http: HttpClient) { }

  listarDividas(): Observable<any> {
    return this.http.get<any>(this.resourceUrl + '/');
  }
  
}
