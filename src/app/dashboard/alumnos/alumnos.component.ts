import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AlumnoModel } from './models/AlumnoModel';
import { AlumnoService } from './services/alumno.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  alumnos: any;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private __as: AlumnoService ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getAlumnos();
  }

  getAlumnos() {
    this.__as.getAlumnos().subscribe(
      data => {
        this.alumnos = data;
        console.log(data)
        this.dtTrigger.next(0);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
