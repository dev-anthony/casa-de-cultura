import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// HTTP Client
import { HttpClientModule } from '@angular/common/http';
// DataTables
import { DataTablesModule } from "angular-datatables";
// Imports externos
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    AlumnosComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
