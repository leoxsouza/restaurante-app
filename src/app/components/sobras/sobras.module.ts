import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobrasComponent } from './sobras.component';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { SobrasRoute } from './sobras.route';


let ENTITY_STATES = [
  ...SobrasRoute
];

@NgModule({
  declarations: [SobrasComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
  ]
})
export class SobrasModule { }
