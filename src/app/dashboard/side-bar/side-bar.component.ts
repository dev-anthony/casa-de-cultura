import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  rol: any = this._cookieService.get('role'); //me trae el rol a traves del token
  name: any = this._cookieService.get('name');

  constructor( private _cookieService: CookieService, ) { }

  ngOnInit(): void {
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

}
