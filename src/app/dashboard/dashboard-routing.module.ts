import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login.guard';
import { Error404Component } from '../error404/error404.component';
import { AgregarAlumnoComponent } from './alumnos/agregar-alumno/agregar-alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { EditarAlumnoComponent } from './alumnos/editar-alumno/editar-alumno.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'alumnos/:id', component: AlumnosComponent },
      { path: 'agregar-alumno', component: AgregarAlumnoComponent }, 
      { path: 'editar-alumno/:id', component: EditarAlumnoComponent, canLoad: [EditarAlumnoComponent
      ] },
    ] 
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
