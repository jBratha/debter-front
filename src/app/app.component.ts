import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {User} from './_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {Role} from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'debter-front';
  mobileQuery: MediaQueryList;
  currentUser: User;
  // isAuthenticated: boolean;
  // hasAdminRole: boolean;

  nav = [
    {
      'title': 'Strona glowna',
      'path': '/',
    },
    {
      'title': 'Moje dlugi',
      'path': '/debts'
    },
    {
      'title': 'Admin',
      'path': '/admin',
      'requireAdmin': 'true'
    }
  ];

  private _mobileQueryListener: () => void;

  @Output() toggleSideNav = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }


  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
