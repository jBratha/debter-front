import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {Alert} from '../_models/alert';
import {AlertType} from '../_models/alert-type';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if ([403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.authenticationService.logout();
        location.reload(true);
      }
      if ([401].indexOf(err.status) !== -1) {
        // this.alertService.error( (type: err.error) err.error);
        this.alertService.error( <Alert>{ type: AlertType.Error, message: err.error});
        this.authenticationService.logout();
      }


      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
