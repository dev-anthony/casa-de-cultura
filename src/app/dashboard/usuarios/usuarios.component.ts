import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  id: any;
  usuarios: any [] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _usuariosService: UsuariosService,
    private _activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getUsuarios();
  }

  getUsuarios() {
    this._usuariosService.getUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
       console.log(data);
      });
  }

  editarUsuario(id: any) {
    console.log(id)
    this.id = this._activateRoute.snapshot.params['id'];
  }

  eliminarUsuario(id : any) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._usuariosService.eliminarUsuario(id).subscribe();
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
          ).then(() => {
            location.reload();
          })
        } else {
          Swal.fire({
            title: 'Cancelado!',
            text: 'No eliminaste  el usuario',
            icon: 'warning',
            showConfirmButton: true,
          })
        }
      })
  }
}
