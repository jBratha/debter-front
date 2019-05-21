import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './core/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {RegisterComponent} from './register/register.component';
import {AlertComponent} from './_component/alert.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {DebtComponent} from './debt/debt.component';
import {registerLocaleData} from '@angular/common';

import localePl from '@angular/common/locales/pl';
import { AddDebtComponent } from './debt/add-debt/add-debt.component';
import { DebtFilterComponent } from './debt/debt-filter/debt-filter.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

// import {FlexLayoutModule} from '@angular/flex-layout';
registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    DebtComponent,
    AddDebtComponent,
    DebtFilterComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // FlexLayoutModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
