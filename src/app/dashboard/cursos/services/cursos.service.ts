import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CursosModel } from '../editar-curso/models/CursosModel';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

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
    // Trae todos los cursos
    getCursos() {
      return this.http.get(this.url + '/api/cursos', {headers: this.headersT});
    }
    // Trae un curso por id
    getCurso(id: any) {
      return this.http.get(this.url + '/api/cursos/' + id, {headers: this.headersT});
    }
  // Obtenemos un curso por su id
  getCursoByID(id: any): Observable<any> {
    return this.http.get(this.url+'/api/cursos/'+id , {headers: this.headersT});
  }
    // Crea un curso
    createCurso(curso: any): Observable<any> {
      return this.http.post(this.url+'/api/cursos/create', curso, {headers: this.headersT});
    }
    // Actualiza un curso
    updateCurso(id: any, curso: any): Observable<any> {
      return this.http.put<any>(this.url+'/api/cursos/edit/'+id, curso, {headers: this.headersT});
    }
    // Elimina un curso
    deleteCurso(id: any) {
      return this.http.delete(this.url + '/api/cursos/delete/' + id, {headers: this.headersT});
    }

  }