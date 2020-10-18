import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SobrasService {

  resourceUrl = `${AppConstants.apiUrl}/sobra-produto`;

  constructor(private http: HttpClient) { }

  listarSobras(): Observable<any> {
    return this.http.get<any>(this.resourceUrl);
  }
}
