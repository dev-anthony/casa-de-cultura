import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Cookies services
import { CookieService } from 'ngx-cookie-service';
// Imports externos
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { Error404Module } from './error404/error404.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    Error404Module,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
  ],
  providers: [CookieService], // Add the CookieService to the providers array.
  bootstrap: [AppComponent]
})
export class AppModule { }
