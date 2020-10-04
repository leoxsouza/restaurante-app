import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
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

  }

  ngOnInit() {
      this.authService.mostrarMenuEmitter.subscribe(
          mostrar => this.mostrarMenu = mostrar
      );

      if (sessionStorage.getItem('token') == null) {
        this.router.navigate(['login']);
      }
    }
}
