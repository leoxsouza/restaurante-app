import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DividaClienteRoute } from './divida-cliente.route';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DividaClienteComponent } from './divida-cliente.component';
import { ConfirmationService, MessageService } from 'primeng/api';

let ENTITY_STATES = [
  ...DividaClienteRoute
];

@NgModule({
  declarations: [DividaClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    FormsModule,
    BrowserModule,
  ],
  providers: [ConfirmationService, MessageService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DividaClienteModule { }
