import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioRoute } from './usuario.route';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ConfirmationService } from 'primeng/api';


let ENTITY_STATES = [
  ...UsuarioRoute
];

@NgModule({
  declarations: [UsuarioComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    FormsModule,
    BrowserModule,
  ],
  providers: [ConfirmationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsuarioModule { }
