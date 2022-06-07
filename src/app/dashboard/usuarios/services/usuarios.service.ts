import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url  : string = 'http://localhost:8080';
  // headers
  headersT = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private coockieService: CookieService)
    {
      const token = this.coockieService.get('token');
      this.headersT =  this.headersT.append('Authorization', 'Bearer ' + token);
    }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any[]>(this.url+'/api/usuarios' , {headers: this.headersT});
  }
  // Obtenemos un usuario por su id
  getUsuarioByID(id: any): Observable<any> {
    return this.http.get(this.url+'/api/usuarios/'+id , {headers: this.headersT});
  }
  // Editamos un usuario con el token
  editarUsuario(id: any, usuario: any): Observable<any> {
    return this.http.put<any>(this.url+'/api/usuarios/edit/'+id, usuario, {headers: this.headersT});
  }
  // Agregamos un usuario
  agregarUsuario(alumno: any): Observable<any> {
    return this.http.post(this.url+'/api/usuarios/create', alumno, {headers: this.headersT});
  }
  // Eliminar un usuario
  eliminarUsuario(id: any): Observable<any[]> {
    return this.http.delete<any[]>(this.url+'/api/usuarios/delete/'+id, {headers: this.headersT});
  }
}
