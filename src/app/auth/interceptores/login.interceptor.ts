import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    private __cookieService: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    try{
      const token = this.__cookieService.get('token');
     let newRequest = request
     newRequest = request.clone({
     
       setHeaders: {
         Authorization: `Bearer ${token}`,
       }
     })
  
     return next.handle(newRequest);
 }catch(e){
  console.log('Erro!!',e);
   return next.handle(request);
 }
  }
}
