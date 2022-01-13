import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './modules/material/material.module';

import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    ErrorSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
