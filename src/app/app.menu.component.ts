import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from './login/auth.service';
import { RolesEnum } from './utils/roles.enum';

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

    items: MenuItem[] = [];

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.setMenu();
    }

    setMenu() {
        if (this.authService.hasHole([RolesEnum.ADMIN, RolesEnum.EMPRESA])) {
            this.items.push({
                label: 'Usuários',
                icon: 'pi pi-user',
                routerLink: 'usuario',
            });

            this.items.push({
                label: 'Dívidas de Clientes',
                icon: 'pi pi-money-bill',
                routerLink: 'divida-cliente'
            });
        }

        if (this.authService.hasHole([RolesEnum.CLIENTE]) ) {
            this.items.push({
                label: 'Minhas dívidas',
                icon: 'pi pi-money-bill',
                routerLink: 'minhas-dividas',
            });
        }
    }

    public sair() {
        localStorage.clear();
        this.authService.usuarioAutenticado.emit(false);
        this.router.navigate(['login']);
    }

}
