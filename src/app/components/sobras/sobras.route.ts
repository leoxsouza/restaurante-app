import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SobrasComponent } from './sobras.component';

export const SobrasRoute: Routes = [
    {
        path: 'sobras',
        component: SobrasComponent,
        canActivate: [AuthGuard]
    },
];
