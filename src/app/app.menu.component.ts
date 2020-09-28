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
            label: 'File',
            items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                {label: 'Open'},
                {label: 'Quit'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        }
    ];
}

    public sair() {
        localStorage.clear();
        this.mostrarMenuEmitter.emit(false);
        this.router.navigate(['login']);
    }

}
