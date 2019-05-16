import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {decode} from 'punycode';
import {Role} from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      // check if route is restricted by role
      const userRoles = currentUser.authorities;
      if (userRoles.includes('ROLE_ADMIN')) {
        return true;
      }

      if (route.data.roles) {
        for (const id in route.data.roles) {
          if (userRoles.includes(route.data.roles[id])) {
            return true;
          }
        }
        this.router.navigate(['/']);
      }

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
