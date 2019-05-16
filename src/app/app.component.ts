import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {User} from './_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {Role} from './_models/role';
import {PwaService} from './_services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dłużnika 2.0';
  currentUser: User;
  @ViewChild(MatSidenav) sidenav;
  nav = [
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
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  logout() {
    this.sidenav.close();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
