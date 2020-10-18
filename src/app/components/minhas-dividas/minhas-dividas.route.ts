import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MinhasDividasComponent } from './minhas-dividas.component';

export const MinhasDividasRoute: Routes = [
    {
        path: 'minhas-dividas',
        component: MinhasDividasComponent,
        canActivate: [AuthGuard]
    },
];
