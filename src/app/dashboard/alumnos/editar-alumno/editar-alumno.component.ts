import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoModel } from '../models/AlumnoModel';
import { AlumnoService } from '../services/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {
  
  form; //Formulario para editar alumno
  id: any; // ID del alumno a editar
  alumnos: AlumnoModel = new AlumnoModel();
  // Constructor donde se hacen las inicializaciones e inyecciones de servicios y dependencias
  constructor(
    private __fb: FormBuilder,
    private __router: Router,
    private __alumnoService: AlumnoService,
    private _activateRoute: ActivatedRoute,
  ) {
    const telValidate = 10;
    // Se crea el grupo de formulario para validar los datos del alumno
    this.form = this.__fb.group({
      nombre_alumno: new FormControl('', [Validators.required]),
      apellido_p: new FormControl('', [Validators.required]),
      apellido_m: new FormControl('', [Validators.required]),
      telefono_1: new FormControl('', [Validators.required, Validators.minLength(telValidate), Validators.maxLength(telValidate)]),
      // valida el telefono para que sea unico
      telefono_2: new FormControl('', [Validators.required, Validators.minLength(telValidate), Validators.maxLength(telValidate)]),
    })
    // Recupero el id del alumno a editar
    this.id = this._activateRoute.snapshot.paramMap.get('id');
    this.__alumnoService.getAlumnoByID(this.id).subscribe(
      data => {
        this.form.setValue = data;
        console.log(data.alumno)
        this.form.controls['nombre_alumno'].setValue(data.alumno.nombre_alumno);
        this.form.controls['apellido_p'].setValue(data.alumno.apellido_p);
        this.form.controls['apellido_m'].setValue(data.alumno.apellido_m);
        this.form.controls['telefono_1'].setValue(data.alumno.telefono_1);
        this.form.controls['telefono_2'].setValue(data.alumno.telefono_2);
      })

   }

  ngOnInit(): void {
  }

  editarAlumno(id: any) {
    this.alumnos.id_alumno = this.id;
    this.alumnos.nombre_alumno = this.form.value.nombre_alumno;
    this.alumnos.apellido_p = this.form.value.apellido_p;
    this.alumnos.apellido_m = this.form.value.apellido_m;
    this.alumnos.telefono_1 = this.form.value.telefono_1;
    this.alumnos.telefono_2 = this.form.value.telefono_2;
    // Se llama al servicio para editar el alumno
    this.__alumnoService.editarAlumno(id, this.alumnos).subscribe(
      data => {
        id = data.id_alumno;
        // console.log(data)
        Swal.fire({
          title: 'Alumno editado!',
          text: 'El alumno ha sido editado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.__router.navigate(['/alumnos']);
      }
    )
  }
  

}
