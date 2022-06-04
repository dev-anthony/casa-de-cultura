import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlumnoService } from '../services/alumno.service';

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {

  form;

  constructor(
    private __fb: FormBuilder,
    private __router: Router,
    private __alumnoService: AlumnoService
  ) {
    this.form = this.__fb.group({
      nombre_alumno: new FormControl('', [Validators.required]),
      apellido_p: new FormControl('', [Validators.required]),
      apellido_m: new FormControl('', [Validators.required]),
      telefono_1: new FormControl('', [Validators.required]),
      telefono_2: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {

    // this.agregarAlumno()
  }

  agregarAlumno() {
    this.__alumnoService.agregarAlumno(this.form.value).subscribe(
      (data) => {
        Swal.fire({
          title: 'Alumno agregado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      })
      this.__router.navigate(['/alumnos'])
  }

}
