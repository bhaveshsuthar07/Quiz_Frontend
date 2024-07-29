import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class authInterceptor implements HttpInterceptor{

  constructor(private service:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

let request = req;
    const token = this.service.getToken();
    if(token!=null){
      request=request.clone({
        setHeaders:{
          'Aurthorization': `Bearer ${token}`
        }
      })
    }

   return next.handle(request);
  }
}
export const authInterceptorProvider= [
  {
    provider:HTTP_INTERCEPTORS,
    useClass:authInterceptor,
    multi:true
  }
]
