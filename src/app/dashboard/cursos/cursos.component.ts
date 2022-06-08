import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {

  id : any;
  formCurso;
  cursos: any [] = [];
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _cursosService: CursosService,
    private _fb: FormBuilder,
    private _activateRoute: ActivatedRoute,
  ) { 
    // recuerda que el fonmControlName tiene que ser como se encuentra en la base de datos
    this.formCurso = this._fb.group({
      nombre_curso: new FormControl('', [Validators.required]),
      descripsion: new FormControl('', [Validators.required]),
      hora_inicio: new FormControl('', [Validators.required]),
      hora_fin: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getCursos();
  }

  isEmpty() {
    if (this.cursos.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'No hay cursos registrados, por favor registra un curso',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  getCursos(){
    
    this._cursosService.getCursos().subscribe(
      (data: any) => {
        this.cursos = data;
        console.log(data);
      },
      (error) => {
        this.isEmpty();
      });
  }

  agregarCurso() {
    this._cursosService.createCurso(this.formCurso.value).subscribe(
      (data) => {
        Swal.fire({
          title: 'Curso creado correctamente',
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          window.location.reload();
        })
        console.log(data)
      });
  }

  // editarCurso(id: any) {
  //   console.log(id)
  //   this.id = this._activateRoute.snapshot.params['id'];
  // }

  eliminarCurso(id : any){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._cursosService.deleteCurso(id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El curso ha sido eliminado.',
          'success'
          ).then(() => {
            location.reload();
          })
        } else {
          Swal.fire({
            title: 'Cancelado!',
            text: 'No eliminaste  el curso',
            icon: 'warning',
            showConfirmButton: true,
          })
        }
      })
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  
}
