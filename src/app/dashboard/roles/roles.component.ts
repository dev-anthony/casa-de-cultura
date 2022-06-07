import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {
  
  formRol;
  roles: any;
  id: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _rolesService: RolesService,
    private _fb: FormBuilder,
    private _cockieService: CookieService,
    private _activateRoute: ActivatedRoute,
  ) {
    this.formRol = this._fb.group({
      tipo_rol: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getRoles();
  }

  isEmpty() {
    if (this.roles.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'No hay roles registrados, por favor registra un rol',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }


  getRoles(){
    this._rolesService.getRoles().subscribe(
      (data : any) => {
        this.roles = data
        console.log(data)
      },
      
      (error) => {
        this.isEmpty();
      });
  }

  agregarRol() {
    this._rolesService.addRol(this.formRol.value).subscribe(
      (data) => {
        Swal.fire({
          title: 'Rol creado correctamente',
          icon: 'success',
          showConfirmButton: true,
        }).then(() => {
          window.location.reload();
        })
        console.log(data)
      });
  }

  editarRol(id: any) {
    this.id = this._activateRoute.snapshot.params['id'];
  }

  eliminarRol(id : any){
    if ( id != '1' && id != '2') {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.value) {
          this._rolesService.eliminarRol(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'El rol ha sido eliminado.',
            'success'
            ).then(() => {
              location.reload();
            })
        }
      })
    } else {
      Swal.fire({
        title: 'Estos roles son por defecto, no se pueden eliminar',
        icon: 'error',
        showConfirmButton: true,
      })
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
