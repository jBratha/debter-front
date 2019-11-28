import {ChangeDetectorRef, Component, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {User} from './_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {TranslateService} from "@ngx-translate/core";
import {MediaObserver} from "@angular/flex-layout";

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
      'title': 'navigator.my-debts',
      'path': '/debts'
    },
    {
      'title': 'navigator.admin-page',
      'path': '/admin',
      'requireAdmin': 'true'
    }
  ];

  private _mobileQueryListener: () => void;

  @Output() toggleSideNav = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public mediaObs: MediaObserver,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  isAdmin() {
    this
    return this.authenticationService.isAdmin();
  }

  logout() {
    this.sidenav.close();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 599 && this.currentUser) {
      this.sidenav.close();
    }
  }


}
