import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { AppMenuComponent } from './app.menu.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptorService } from './service/header-interceptor.service';
import { UsuarioModule } from './components/usuario/usuario.module';
import { AuthGuard } from './guards/auth.guard';
import { BlockUIModule } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { DividaClienteModule } from './components/divida-cliente/divida-cliente.module';
import { MinhasDividasModule } from './components/minhas-dividas/minhas-dividas.module';
import { SobrasModule } from './components/sobras/sobras.module';
import { ProdutoModule } from './components/produto/produto.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    PRIMENG_IMPORTS,
    HttpClientModule,
    UsuarioModule,
    BlockUIModule.forRoot(),
    DividaClienteModule,
    MinhasDividasModule,
    SobrasModule,
    ProdutoModule

  ],
  providers: [AuthService, AuthGuard, MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
