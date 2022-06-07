import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../error404/error404.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { CursosAlumnosComponent } from './cursos-alumnos/cursos-alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { EditarCursoComponent } from './cursos/editar-curso/editar-curso.component';
import { DashboardComponent } from './dashboard.component';
import { EditarRolComponent } from './roles/editar-rol/editar-rol.component';
import { RolesComponent } from './roles/roles.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'alumnos/:id', component: AlumnosComponent },
      { path: 'agregar-alumno', component: AgregarAlumnoComponent }, 
      { path: 'editar-alumno/:id', component: EditarAlumnoComponent, canLoad: [EditarAlumnoComponent
      ]},
      { path: 'roles', component: RolesComponent },
      { path: 'roles:/id', component: RolesComponent },
      { path: 'editar-rol/:id', component: EditarRolComponent },
      { path: 'cursos', component: CursosComponent },
      { path: 'cursos/:id', component: CursosComponent },
      { path: 'cursos-alumnos', component: CursosAlumnosComponent },
      { path: 'editar-curso/:id', component: EditarCursoComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/:id', component: UsuariosComponent },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
    ] 
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
