import { NgModule } from '@angular/core';
// Import forms module
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// HTTP Client
import { HttpClientModule } from '@angular/common/http';
// DataTables
import { DataTablesModule } from "angular-datatables";
// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';
// Imports externos
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { RolesComponent } from './roles/roles.component';
import { CursosAlumnosComponent } from './cursos-alumnos/cursos-alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { EditarCursoComponent } from './cursos/editar-curso/editar-curso.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EditarRolComponent } from './roles/editar-rol/editar-rol.component';
import { InscribemeComponent } from './inscribeme/inscribeme.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    AlumnosComponent,
    AgregarAlumnoComponent,
    EditarAlumnoComponent,
    RolesComponent,
    CursosAlumnosComponent,
    CursosComponent,
    EditarCursoComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    EditarRolComponent,
    InscribemeComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
