import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const UsuarioRoute: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
    },
];
