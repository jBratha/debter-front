import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {


    this.userService
      .getInfoAboutYourself()
      // .getByUsername(this.currentUser.username)
      .pipe(first())
      .subscribe(user => {
        this.userFromApi = user;
      });
  }
}
