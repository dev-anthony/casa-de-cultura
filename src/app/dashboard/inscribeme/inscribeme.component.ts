import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumnos/services/alumno.service';
import { CursosService } from '../cursos/services/cursos.service';

@Component({
  selector: 'app-inscribeme',
  templateUrl: './inscribeme.component.html',
  styleUrls: ['./inscribeme.component.css']
})
export class InscribemeComponent implements OnInit {

  id      : any;
  alumnos : any;
  cursos  : any;

  constructor(
    private _cursosServices: CursosService,
    private _alumnoServices: AlumnoService,

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
    
  cursoAlm(id : any) {}

  alumnoCurso(id : any) {}

  }
