// import {Injectable} from '@angular/core';
// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Router} from '@angular/router';
// import {TokenStorage} from './token.storage';
// import 'rxjs/add/operator/do';
// import {Observable} from 'rxjs';
//
// const TOKEN_HEADER_KEY = 'Authorization';
//
// @Injectable()
// export class Interceptor implements HttpInterceptor {
//
//   constructor(private token: TokenStorage, private router: Router) {
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let authReq = req;
//     if (this.token.getToken() != null) {
//       authReq = req.clone({
//         headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())
//       });
//     }
//     return next.handle(authReq);
//   }
//
//
// }
