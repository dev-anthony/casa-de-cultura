import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { CursosModel } from './models/CursosModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {
  
  formCurso;
  id : any;
  cursos: CursosModel = new CursosModel();

  constructor(
    private _fb: FormBuilder,
    private _cursosService: CursosService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
  ) {
    this.formCurso = this._fb.group({
      nombre_curso: new FormControl('', [Validators.required]),
      descripsion: new FormControl('', [Validators.required]),
      hora_inicio: new FormControl('', [Validators.required]),
      hora_fin: new FormControl('', [Validators.required]),
    })
    // Recupero el id del curso a editar
    this.id = this._activateRoute.snapshot.paramMap.get('id');
    this._cursosService.getCursoByID(this.id).subscribe(
      (data: any) => {
        this.formCurso.setValue = data;
        console.log(data.curso);
        this.formCurso.controls['nombre_curso'].setValue(data.curso.nombre_curso);
        this.formCurso.controls['descripsion'].setValue(data.curso.descripsion);
        this.formCurso.controls['hora_inicio'].setValue(data.curso.hora_inicio);
        this.formCurso.controls['hora_fin'].setValue(data.curso.hora_fin);
      })
   }

  ngOnInit(): void {
  }

  editarCurso(id : any){
    this.cursos.id_curso = this.id;
    this.cursos.nombre_curso = this.formCurso.value.nombre_curso;
    this.cursos.descripsion = this.formCurso.value.descripsion;
    this.cursos.hora_inicio = this.formCurso.value.hora_inicio;
    this.cursos.hora_fin = this.formCurso.value.hora_fin;

    this._cursosService.updateCurso(id, this.cursos).subscribe(
      (data: any) => {
        id = data.id_curso;
        console.log(data);
        Swal.fire({
          title: 'Curso editado',
          text: 'El curso se ha editado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this._router.navigate(['/cursos']);
      })
  }

}
