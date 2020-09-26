import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-menu',
    template: `
        <p-menubar [model]="items">
          <div>
              <button type="button" pButton label="Sair" icon="pi pi-power-off" style="margin-left:.25em"></button>
          </div>
        </p-menubar>

    `
})
export class AppMenuComponent implements OnInit {

  items: MenuItem[];

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

}
