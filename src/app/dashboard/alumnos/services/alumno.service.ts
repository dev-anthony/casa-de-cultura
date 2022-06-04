import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AlumnoModel } from '../models/AlumnoModel';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

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

  // Obtener todos los alumnos
  getAlumnos(): Observable<any> {
    return this.http.get<any[]>(this.url+'/api/alumnos' , {headers: this.headersT});
  }
  // Obtenemos un alumno por su id
  getAlumnoByID(id: any): Observable<any> {
    return this.http.get(this.url+'/api/alumnos/'+id , {headers: this.headersT});
  }
  // Editamos un alumno con el token
  editarAlumno(id: any, alumno: any): Observable<AlumnoModel> {
    return this.http.put<AlumnoModel>(this.url+'/api/alumnos/edit/'+id, alumno, {headers: this.headersT});
  }
  // Agregamos un alumno
  agregarAlumno(alumno: any): Observable<any> {
    return this.http.post(this.url+'/api/alumnos/create', alumno, {headers: this.headersT});
  }
  // Eliminar un alumno
  eliminarAlumno(id: any): Observable<any[]> {
    return this.http.delete<any[]>(this.url+'/api/alumnos/delete/'+id, {headers: this.headersT});
  }
}
