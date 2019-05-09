import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private auth = environment.auth;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log(this.currentUserSubject);
    console.log( this.currentUserSubject.value);
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attemptAuth ::');
    return this.http.post(this.auth, credentials);
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.auth, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser');
    console.log(token);
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

  isAdmin() {
    // this.getInfoAboutYourself().
    return this.getInfoAboutYourself();
  }
}
