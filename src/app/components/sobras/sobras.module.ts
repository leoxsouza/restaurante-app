import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SobrasComponent } from './sobras.component';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { SobrasRoute } from './sobras.route';
import { SobrasFormComponent } from './sobras-form/sobras-form.component';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { customCurrencyMaskConfig } from 'src/app/utils/currency-mask-config';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt'

let ENTITY_STATES = [
  ...SobrasRoute
];

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [SobrasComponent, SobrasFormComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    BrowserModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SobrasModule { }
