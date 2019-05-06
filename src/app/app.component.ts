import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'debter-front';
  mobileQuery: MediaQueryList;
  nav = [
    {
      'title': 'Strona glowna',
      'path': '/'
    },
    {
      'title': 'Moje dlugi',
      'path': '/debts'
    }
  ];

  private _mobileQueryListener: () => void;

  @Output() toggleSideNav = new EventEmitter();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
      console.log('toggle')
    }
  }
}
