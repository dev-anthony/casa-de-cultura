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
import { InscribemeComponent } from './inscribeme/inscribeme.component';
import { EditarRolComponent } from './roles/editar-rol/editar-rol.component';
import { RolesComponent } from './roles/roles.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: 'alumnos', component: AlumnosComponent, canLoad: [AlumnosComponent], },
      { path: 'alumnos/:id', component: AlumnosComponent, canLoad: [AlumnosComponent], },
      { path: 'agregar-alumno', component: AgregarAlumnoComponent, canLoad: [AgregarAlumnoComponent] }, 
      { path: 'editar-alumno/:id', component: EditarAlumnoComponent, canLoad: [EditarAlumnoComponent] },
      { path: 'roles', component: RolesComponent, canLoad: [RolesComponent] },
      { path: 'roles:/id', component: RolesComponent, canLoad: [RolesComponent] },
      { path: 'editar-rol/:id', component: EditarRolComponent, canLoad: [EditarRolComponent] },
      { path: 'cursos', component: CursosComponent, canLoad: [CursosComponent] },
      { path: 'cursos/:id', component: CursosComponent, canLoad: [CursosComponent] },
      { path: 'cursos-alumnos', component: CursosAlumnosComponent, canLoad: [CursosAlumnosComponent] },
      { path: 'editar-curso/:id', component: EditarCursoComponent, canLoad: [EditarCursoComponent] },
      { path: 'usuarios', component: UsuariosComponent, canLoad: [UsuariosComponent] },
      { path: 'usuarios/:id', component: UsuariosComponent, canLoad: [UsuariosComponent] },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canLoad: [EditarUsuarioComponent] },

      { path: 'inscribeme', component: InscribemeComponent, canLoad: [InscribemeComponent] },
    ] 
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
