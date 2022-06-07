import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

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
  // nos traemos todos los roles
  getRoles() {
    return this.http.get(`${this.url}/api/roles`, {headers: this.headersT});
  }
  // Obtenemos un rol por su id
  getRolByID(id: any): Observable<any> {
    return this.http.get(this.url+'/api/roles/'+id , {headers: this.headersT});
  }
  // Editamos un rol con el token
  editarAlumno(id: any, rol: any): Observable<any> {
    return this.http.put<any>(this.url+'/api/roles/edit/'+id, rol, {headers: this.headersT});
  }
  // Agregar un nuevo rol
  addRol(rol: any): Observable<any> {
    return this.http.post(this.url+'/api/roles/create', rol, {headers: this.headersT});
  }

  // eliminar rol 
  eliminarRol(id: any) {
    return this.http.delete(`${this.url}/api/roles/delete/${id}`, {headers: this.headersT});
    }
  }