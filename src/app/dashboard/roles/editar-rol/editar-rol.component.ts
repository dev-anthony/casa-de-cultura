import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolModel } from '../models/RolModel';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {

  id : any;
  roles : RolModel = new RolModel();
  formRol;

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _rolesService: RolesService,
    private _router: Router,
  ) {
    this.formRol = this._fb.group({
      tipo_rol: new FormControl('', [Validators.required]),
    })
    // Recupero el id del alumno a editar
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this._rolesService.getRolByID(this.id).subscribe(
      (data : any) => {
        this.formRol.setValue = data;
        console.log(data.rol)
        this.formRol.controls['tipo_rol'].setValue(data.rol.tipo_rol);
      })
   }

  ngOnInit(): void {
  }

  editarRol(id : any){
    this.roles.id_rol = this.id;
    this.roles.tipo_rol = this.formRol.value.tipo_rol;

    this._rolesService.editarAlumno(id, this.roles).subscribe(
      data => {
        id = data.id_alumno;
        // console.log(data)
        Swal.fire({
          title: 'Rol editado!',
          text: 'El rol ha sido editado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this._router.navigate(['/roles']);
      })
  }

}
