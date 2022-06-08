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

   agregarAlumnoCurso(): Observable<any> {
    return this.http.post( this.url+'/api/registros/create', {headers: this.headersT});
   }

   public postAlumnoCurso (url:string, body: any){
    return this.http.post(url, body,{headers: this.headersT});
  }

  }