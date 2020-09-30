import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioRoute } from './usuario.route';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';


let ENTITY_STATES = [
  ...UsuarioRoute
];

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    FormsModule,
    BrowserModule,
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsuarioModule { }
