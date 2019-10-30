import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {User} from './_models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {TranslateService} from "@ngx-translate/core";

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
      'title': 'Moje długi',
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
    private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    translate.setDefaultLang('pl');
    translate.use('pl');
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

  useLanguage(lang: string) {
    console.log('Swapping lang to ' + lang);
    this.translate.use(lang);
  }
}
