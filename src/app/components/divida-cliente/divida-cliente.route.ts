import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DividaClienteFormComponent } from './divida-cliente-form/divida-cliente-form.component';
import { DividaClienteComponent } from './divida-cliente.component';

export const DividaClienteRoute: Routes = [
    {
        path: 'divida-cliente',
        component: DividaClienteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'divida-cliente/cadastrar',
        component: DividaClienteFormComponent,
        canActivate: [AuthGuard]
    },
];
