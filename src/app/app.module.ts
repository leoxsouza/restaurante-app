import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { AppMenuComponent } from './app.menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    PRIMENG_IMPORTS

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
