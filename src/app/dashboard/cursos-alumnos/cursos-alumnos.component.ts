import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CursosAlumnosService } from './services/cursos-alumnos.service';

@Component({
  selector: 'app-cursos-alumnos',
  templateUrl: './cursos-alumnos.component.html',
  styleUrls: ['./cursos-alumnos.component.css']
})
export class CursosAlumnosComponent implements OnInit, OnDestroy {
  
  cursos: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _cAS: CursosAlumnosService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getCursosAlumnos();
  }

  getCursosAlumnos() {
    this._cAS.getCursosAlumnos().subscribe(
      (data : any) => {
        this.cursos = data
        console.log(data)
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
