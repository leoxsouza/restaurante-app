import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  processaError(error: HttpErrorResponse) {
    let trace = error.error.trace;
    let pInicial = trace.indexOf('#iex') + 4;
    let pFinal = trace.indexOf('#fex');
    let errorMessage = trace.substring(pInicial, pFinal);

    return throwError(errorMessage);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(
        catchError(this.processaError)
      )

    }

    return next.handle(req).pipe(catchError(this.processaError));
  }


}
