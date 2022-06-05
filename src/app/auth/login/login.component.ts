import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin;

  constructor(
    private __fb: FormBuilder,
    private __router: Router,
    private __cookieService: CookieService,
    private __loginService: LoginService,
  ) { 
    const minPassLength = 4;
    this.formLogin = this.__fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(minPassLength)])
    })
  }

  ngOnInit(): void {
  }

  login() {
    const {username, password} = this.formLogin.value
    this.__loginService.login(username, password).subscribe(
        (res) => {
           console.log(res);
           const {token} = res;
           const {name} = res;
           const {username} = res;
           const {rol_id} = res;
           this.__cookieService.set('name',name);
           this.__cookieService.set('username',username);
           this.__cookieService.set('role',rol_id);
           //duracion del token de una hora
           this.__cookieService.set('token',token,1/24);
           this.__router.navigate(['/alumnos']);
          Swal.fire({
            title: `Bienvenid@ <p class="text-capitalize">${name.split(' ')[0]}</p>`, // me trae el nombre del usuario solamente
            icon: 'success',
            showConfirmButton: true,
          });
      }); // fin del res y subscribe
    }
}
