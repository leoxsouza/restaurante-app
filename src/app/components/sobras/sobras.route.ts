import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SobrasFormComponent } from './sobras-form/sobras-form.component';
import { SobrasComponent } from './sobras.component';

export const SobrasRoute: Routes = [
    {
        path: 'sobras',
        component: SobrasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sobras/cadastrar',
        component: SobrasFormComponent,
        canActivate: [AuthGuard]
    },
];
