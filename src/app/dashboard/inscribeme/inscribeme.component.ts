import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoModel } from '../alumnos/models/AlumnoModel';
import { AlumnoService } from '../alumnos/services/alumno.service';
import { CursosService } from '../cursos/services/cursos.service';
import { CursosAlumnosService } from './services/cursos-alumnos.service';

@Component({
  selector: 'app-inscribeme',
  templateUrl: './inscribeme.component.html',
  styleUrls: ['./inscribeme.component.css']
})
export class InscribemeComponent implements OnInit {

  formID;
  formAlumCurso;

  id_curso        : any;
  id_alumno       : any;
  alumnos         : any;
  cursos          : any;

  seleccionado: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _cursosAlumnosServices : CursosAlumnosService,
    private _cursosServices        : CursosService,
    private _alumnoServices        : AlumnoService,
    private _activateRoute         : ActivatedRoute,
  ) {
    this.formAlumCurso = this._fb.group({
      nombre_alumno: new FormControl('', [Validators.required]),
      apellido_p: new FormControl('', [Validators.required]),
      apellido_m: new FormControl('', [Validators.required]),
      nombre_curso: new FormControl('', [Validators.required]),
    })
    this.formID = this._fb.group({
      id_alumno: new FormControl({ value: this.id_alumno, disabled: true }),
      id_curso: new FormControl({ value: this.id_alumno, disabled: true }),
    })
   }

  ngOnInit(): void {
    this.getCursos();
    this.getAlumnos();
    console.log('asdfasfasf',this.id_alumno);
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
          this.formAlumCurso.controls['nombre_curso'].setValue(data.curso.nombre_curso);
          this.formID.controls['id_curso'].setValue(data.curso.id_curso);
        })
    }

    getAlumnoID(id: any) {
      this.id_alumno = this._activateRoute.snapshot.paramMap.get('id');
      this._alumnoServices.getAlumnoByID(id).subscribe(
        (data) => {
          this.formAlumCurso.setValue = data;
          console.log(data.alumno);
          this.formAlumCurso.controls['nombre_alumno'].setValue(data.alumno.nombre_alumno);
          this.formAlumCurso.controls['apellido_p'].setValue(data.alumno.apellido_p);
          this.formAlumCurso.controls['apellido_m'].setValue(data.alumno.apellido_m);
          this.formID.controls['id_alumno'].setValue(data.alumno.id_alumno);
        })
    }

    agregarAlumnoCursos() {
      console.log('asfdasdfsafasdfasdf', this.formID.value);
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Deseas agregar este alumno al curso?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        focusConfirm: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, agregar!'
      }).then((result) => {
        if (result.value) {
          this._cursosAlumnosServices.postAlumnoCurso('http://localhost:8080/api/registros/create', this.formID.value).subscribe(
            (data : any) => {
              console.log(data);
              Swal.fire(
                'Agregado!',
                'El alumno se agrego al curso.',
                'success'
              )
            })
        }
        

      })
    }

  }
