import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  resourceUrl = `${AppConstants.apiUrl}/empresa`;

  constructor(private http: HttpClient) { }

  getEmpresasDropdown(): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/drop-down`);
  }
}
