import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlumnoModel } from '../alumnos/models/AlumnoModel';
import { AlumnoService } from '../alumnos/services/alumno.service';
import { CursosService } from '../cursos/services/cursos.service';

@Component({
  selector: 'app-inscribeme',
  templateUrl: './inscribeme.component.html',
  styleUrls: ['./inscribeme.component.css']
})
export class InscribemeComponent implements OnInit {

  form;

  id_curso      : any;
  id_alumno      : any;
  alumnos : any;
  cursos  : any;

  seleccionado: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _cursosServices: CursosService,
    private _alumnoServices: AlumnoService,
    private _activateRoute: ActivatedRoute,
  ) {
    this.form = this._fb.group({
      nombre_alumno: new FormControl('', [Validators.required]),
      apellido_p: new FormControl('', [Validators.required]),
      apellido_m: new FormControl('', [Validators.required]),
      nombre_curso: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.getCursos();
    this.getAlumnos();
  }

  
  getCursos() {
    this._cursosServices.getCursos().subscribe(
      (data) => {
        this.cursos = data;
        console.log(data);
      })
    }

  getAlumnos() {
    this._alumnoServices.getAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
        console.log(data);
      })
    }

    getCursoID(id: any) {
      this.id_curso = this._activateRoute.snapshot.paramMap.get('id');
      this._cursosServices.getCursoByID(id).subscribe(
        (data) => {
          console.log(data.curso);
          this.form.controls['nombre_curso'].setValue(data.curso.nombre_curso);
        })
    }

    getAlumnoID(id: any) {
      this.id_alumno = this._activateRoute.snapshot.paramMap.get('id');
      this._alumnoServices.getAlumnoByID(id).subscribe(
        (data) => {
          this.form.setValue = data;
          console.log(data.alumno);
          this.form.controls['nombre_alumno'].setValue(data.alumno.nombre_alumno);
          this.form.controls['apellido_p'].setValue(data.alumno.apellido_p);
          this.form.controls['apellido_m'].setValue(data.alumno.apellido_m);
        })
    }

    agregarAlumnoCursos() {
      
    }

  }
