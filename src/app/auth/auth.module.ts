import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing del padre
import { AuthRoutingModule } from './auth-routing.module';
// HTTP Client
import { HttpClientModule } from '@angular/common/http';
// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';
// Imports externos
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
