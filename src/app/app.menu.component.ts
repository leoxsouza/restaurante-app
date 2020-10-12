import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from './login/auth.service';

@Component({
    selector: 'app-menu',
    template: `
        <p-menubar [model]="items">
          <div>
              <button (click)="sair()" type="button" pButton label="Sair" icon="pi pi-power-off" style="margin-left:.25em"></button>
          </div>
        </p-menubar>

    `
})
export class AppMenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Usuários',
            icon: 'pi pi-user',
            routerLink: 'usuario'

        },
        {
            label: 'Dívidas de Clientes',
            icon: 'pi pi-money-bill',
            routerLink: 'divida-cliente'
        }
    ];
}

    public sair() {
        localStorage.clear();
        this.authService.usuarioAutenticado.emit(false);
        this.router.navigate(['login']);
    }

}
