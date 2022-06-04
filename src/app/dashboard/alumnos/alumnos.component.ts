import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// Import del modelo de alumno
import { AlumnoModel } from './models/AlumnoModel';
// Import de los servicios
import { AlumnoService } from './services/alumno.service';
// Import de sweetalert2
import swal from'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
     ) {
       
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getAlumnos();
  }

  getAlumnos() {
    this._as.getAlumnos().subscribe(
      data => {
        this.alumnos = data;
        console.log(data)
        this.dtTrigger.next(0);
      }
    );
  }

  editarAlumno(id: any) {
    console.log(id)
    this.id = this._activateRoute.snapshot.params['id'];
  }

  eliminarAlumno(id : any) {
    this._as.eliminarAlumno(id).subscribe();
    swal.fire(
      'Alumno eliminado!',
      'El alumno ha sido eliminado correctamente.',
      'success'
      )
      // refresca la pagina para que se vea el cambio
      this._router.navigate(['/alumnos']);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
