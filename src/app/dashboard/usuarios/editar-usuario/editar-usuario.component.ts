import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/UsuarioModel';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id : any;
  formUsuario;
  usuarios: UsuarioModel = new UsuarioModel();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _usuariosService: UsuariosService,
  ) {
    this.formUsuario = this._fb.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
    // Recupero el id del usuario a editar
    this.id = this._activateRoute.snapshot.paramMap.get('id');
    this._usuariosService.getUsuarioByID(this.id).subscribe(
      (data: any) => {
        this.formUsuario.setValue = data;
        console.log(data.usuario);
        this.formUsuario.controls['name'].setValue(data.usuario.name);
        this.formUsuario.controls['username'].setValue(data.usuario.username);
        this.formUsuario.controls['password'].setValue(data.usuario.password);
      })
   }

  ngOnInit(): void {
  }

  editarUsuario(id : any){
    this.usuarios.id_usuario = this.id;
    this.usuarios.name = this.formUsuario.value.name;
    this.usuarios.username = this.formUsuario.value.username;
    this.usuarios.password = this.formUsuario.value.password;

    this._usuariosService.editarUsuario(id, this.usuarios).subscribe(
      (data: any) => {
        id = data.id_curso;
        console.log(data);
        Swal.fire({
          title: 'Usuario editado',
          text: 'El usuario se ha editado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this._router.navigate(['/usuarios']);
      })
  }

}
