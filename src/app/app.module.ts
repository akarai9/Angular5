import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Form Modules*/
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpModule,Http } from '@angular/http';

/*Primeng Modules*/
import { ButtonModule, GrowlModule, DialogModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AppComponent } from './app.component';

import { routes } from './app.routing';
import { GlobalService } from './GlobalService';

import { AuthGuard } from './auth-guard.service';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { EqualValidator } from './Directives/validation.directive';


@NgModule({
  declarations: [
    EqualValidator,
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    GrowlModule,
    DialogModule
  ],
  providers: [GlobalService, AuthGuard, { provide: LocationStrategy, 
              useClass: HashLocationStrategy }, MessageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
