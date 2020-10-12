import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DividaClienteRoute } from './divida-cliente.route';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DividaClienteComponent } from './divida-cliente.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DividaClienteFormComponent } from './divida-cliente-form/divida-cliente-form.component';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { customCurrencyMaskConfig } from 'src/app/utils/currency-mask-config';
import localePt from '@angular/common/locales/pt'

let ENTITY_STATES = [
  ...DividaClienteRoute
];

registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [DividaClienteComponent, DividaClienteFormComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    FormsModule,
    BrowserModule,
    CurrencyMaskModule
  ],
  providers: [
    ConfirmationService, 
    MessageService, 
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig },
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DividaClienteModule { }
