import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioRoute } from './usuario.route';


let ENTITY_STATES = [
  ...UsuarioRoute
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
  ]
})
export class UsuarioModule { }
