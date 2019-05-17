import {Injectable} from '@angular/core';
import {HttpbaseService} from '../http/httpbase.service';
import {User} from '../_models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  // getAllUsers() {
  //   return super.getAll<User>('/users');
  // }
  //
  // getById(id: number): Observable<any> {
  //   return super.getSingle<User>(id);
  //   // return this.http.get<User>(`${config.apiUrl}/users/${id}`);
  // }

  getAllUsers<T>() {
    return this.http.get<User[]>(`${environment.api}/users/all`, {observe: 'response'});
  }

  getUsernames<T>() {
    return this.http.get<string>(`${environment.api}/users`, {observe: 'response'});
  }

  getByUsername(username: String) {
    return this.http.get<User>(`${environment.api}/users/name/${username}`);
  }

  getInfoAboutYourself() {
    return this.http.get<User>(`${environment.api}/users/me`);
  }

  register(user: User) {
    return this.http.post(`${environment.api}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.api}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/users/${id}`);
  }
}
