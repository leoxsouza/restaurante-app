import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoComponent } from './produto.component';

export const ProdutoRoute: Routes = [
    {
        path: 'produto',
        component: ProdutoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'produto/cadastrar',
        component: ProdutoFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'produto/:acao/:id',
        component: ProdutoFormComponent,
        canActivate: [AuthGuard]
    }
];
