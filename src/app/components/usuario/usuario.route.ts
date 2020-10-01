import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

export const UsuarioRoute: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuario/:acao',
        component: UsuarioFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuario/:acao/:id',
        component: UsuarioFormComponent,
        canActivate: [AuthGuard]
    }
];
