import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// Import del modelo de alumno
import { AlumnoModel } from './models/AlumnoModel';
// Import de los servicios
import { AlumnoService } from './services/alumno.service';
// Import de sweetalert2
import swal from'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {

  alumnos: any [] = [];
  id: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _as: AlumnoService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _cookieService: CookieService,
     ) {
       
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAlumnos();
  }

  isEmpty() {
    if (this.alumnos.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'No hay alumnos registrados, por favor registra un alumno',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }


  getAlumnos() {
    this._as.getAlumnos().subscribe(
      data => {
        this.alumnos = data;
        console.log(data)
        this.dtTrigger.next(0);
      },
      error => {
        this.isEmpty();
      }
    );
  }

  editarAlumno(id: any) {
    console.log(id)
    this.id = this._activateRoute.snapshot.params['id'];
  }

  eliminarAlumno(id : any) {
    const rol = this._cookieService.get('role');
    if (rol === '1') {
      this._as.eliminarAlumno(id).subscribe();
      swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.value) {
          this._as.eliminarAlumno(id).subscribe();
          swal.fire(
            'Eliminado!',
            'El alumno ha sido eliminado.',
            'success'
            ).then(() => {
              location.reload();
            })
        }
      })
    } else {
      swal.fire({
        title: '¡Error!',
        text: 'No tienes permisos para eliminar alumnos, solo el administrador puede eliminar alumnos',
        icon: 'error',
        showConfirmButton: true,
      })
    }

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
