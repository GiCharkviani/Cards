import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {tap} from 'rxjs/operators'



export class Interceptor implements HttpInterceptor {

  intercept(req:HttpRequest<any>, next: HttpHandler){

    return next.handle(req)

  }

}
