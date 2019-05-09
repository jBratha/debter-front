import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../_models/user';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  authorities: Array<string>;

  private auth = environment.auth;

  constructor(private http: HttpClient,
              private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post(this.auth, credentials);
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.auth, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.authorities = user.authorities;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({'token': user.token}));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  public hasRole(role: string): boolean {
    return this.authorities && this.authorities.includes(role);
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    // console.log(token.token);
    return token !== null;
    // return token.token;
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getInfoAboutYourself() {
    return this.http.get<User>(`${environment.api}/users/me`);
  }

  public isAdmin() {
    return this.hasRole('ROLE_ADMIN');
  }
}
