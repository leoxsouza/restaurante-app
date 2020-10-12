import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurante-app';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.mostrarMenu = this.authService.usuarioEstaAutenticado();
  }

  ngOnInit() {

      this.authService.usuarioAutenticado.subscribe(autenticado => this.mostrarMenu = autenticado);

      if (localStorage.getItem('token') == null) {
        this.router.navigate(['login']);
      }
    }
}
