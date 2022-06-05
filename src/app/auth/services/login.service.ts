import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private __http: HttpClient ) { }

  endpoint: string = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // login enviando los datos de body
    login(username:string, password:string): Observable<any>{
      const body ={
        username,
        password
      }
    return  this.__http.post(`${this.endpoint}/login`,body,{headers:this.headers});
    }

}
