import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasDividasComponent } from './minhas-dividas.component';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { RouterModule } from '@angular/router';
import { MinhasDividasRoute } from './minhas-dividas.route';


let ENTITY_STATES = [
  ...MinhasDividasRoute
];

@NgModule({
  declarations: [MinhasDividasComponent],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
  ]
})
export class MinhasDividasModule { }
