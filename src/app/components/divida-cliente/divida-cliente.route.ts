import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DividaClienteComponent } from './divida-cliente.component';

export const DividaClienteRoute: Routes = [
    {
        path: 'divida-cliente',
        component: DividaClienteComponent,
        canActivate: [AuthGuard]
    },
];
