import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CursosAlumnosService {

  url  : string = 'http://localhost:8080';
  // headers
  headersT = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private coockieService: CookieService
  ) {
    const token = this.coockieService.get('token');
    this.headersT =  this.headersT.append('Authorization', 'Bearer ' + token);
   }

     // Obtener todos los cursos-alumnos
  getCursosAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.url+'/api/registros/' , {headers: this.headersT});
  }
  // Obtiene el curso por alumno
  getCursoAlumno(id: any) {
    return this.http.get<any[]>(this.url+'/api/registors'+id, {headers: this.headersT} )
  }
}
