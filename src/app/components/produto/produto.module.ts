import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from 'src/app/primeng-imports';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { customCurrencyMaskConfig } from 'src/app/utils/currency-mask-config';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt'
import { ProdutoRoute } from './produto.route';
import { ProdutoComponent } from './produto.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

let ENTITY_STATES = [
  ...ProdutoRoute
];

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [ProdutoComponent, ProdutoFormComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot( ENTITY_STATES, { useHash: true } ),
    PRIMENG_IMPORTS,
    BrowserModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProdutoModule { }
