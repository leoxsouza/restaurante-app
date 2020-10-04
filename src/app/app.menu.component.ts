import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

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

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Usuários',
            icon: 'pi pi-user',
            routerLink: 'usuario'

        },
    ];
}

    public sair() {
        sessionStorage.clear();
        this.mostrarMenuEmitter.emit(false);
        this.router.navigate(['login']);
    }

}
