import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  rol: any = this._cookieService.get('role'); //me trae el rol a traves del token
  name: any = this._cookieService.get('name');

  constructor( private _cookieService: CookieService, private _router: Router  ) { }

  ngOnInit(): void {
    this.cerrarSesionPorDia();
  }

  // ocultar por rol lo que se ve en el sidebar
  ocultarPorRol() {
    const rol = this._cookieService.get('role');
    if (rol === '1') {
      return true;
    } else {
      return false;
    }
  }
  // si cierra sesion, elimina el token
  cerrarSesion() {
    this._cookieService.delete('token');
    this._cookieService.delete('name');
    this._cookieService.delete('username');
    this._cookieService.delete('role');

    Swal.fire({
      title: `Sesión cerrada, Adiós
      <p class="text-capitalize">${this.name.split(' ')[0]}</p>`,
      icon: 'success',
      showConfirmButton: true,
    }).then(() => {
      this._router.navigate(['/login']).then(() => {
      })
    })
  }

  // al pasar un dia el token se elimina y cierra sesion
  cerrarSesionPorDia() {
    const token = this._cookieService.get('token'); //me trae el token a traves del cookieService
    const fecha = new Date(token); //fecha de expiracion del token
    const fechaActual = new Date(); //fecha actual
    const diferencia = fechaActual.getTime() - fecha.getTime();
    const dias = Math.round(diferencia / (1000 * 60 * 60 * 24)); // calcula la diferencia de dias entre la fecha de expiracion del token y la fecha actual
    if (dias > 1) {
      this._cookieService.delete('token');
      this._cookieService.delete('name');
      this._cookieService.delete('username');
      this._cookieService.delete('role');
      Swal.fire({
        title: 'Sesión cerrada',
        icon: 'success',
        showConfirmButton: true,
      }).then(() => {
        this._router.navigate(['/login']);
      })
    }
  }
}
