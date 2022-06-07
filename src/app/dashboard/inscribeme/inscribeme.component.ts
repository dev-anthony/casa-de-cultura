import { Component, OnInit } from '@angular/core';
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

  id_curso      : any;
  id_alumno      : any;
  alumnos : any;
  cursos  : any;

  seleccionado: boolean = false;

  constructor(
    private _cursosServices: CursosService,
    private _alumnoServices: AlumnoService,
    private _activateRoute: ActivatedRoute,
  ) { }

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
      this._cursosServices.getCursoByID(id).subscribe(
        (data) => {
          console.log(data);
        })
    }

    getAlumnoID(id: any) {
      this.id_alumno = this._activateRoute.snapshot.paramMap.get('id');
      this._alumnoServices.getAlumnoByID(id).subscribe(
        (data) => {
          console.log(data.alumno);
        })
    }

    sleccionAlumno(id: any) {
      this.id_alumno = id;
      console.log(id);
    }

    sleccionCurso(id: any) {
      this.id_curso = id;
      console.log(id);
    }

  }
