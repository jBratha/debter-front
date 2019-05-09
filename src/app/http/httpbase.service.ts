import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpbaseService {

  private headers = new HttpHeaders();
  private endpoint = environment.api;

  constructor(
    private httpClient: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  getAll<T>(endpoint?: string): Observable<any> {
    return this.httpClient.get<T>(this.endpoint + (endpoint === undefined) ? '' : `${endpoint}`, { observe: 'response' });
  }

  getSingle<T>(id: number) {
    return this.httpClient.get<T>(`${this.endpoint}${id}`);
  }
  add<T>(toAdd: T) {
    return this.httpClient.post<T>(this.endpoint, toAdd, { headers: this.headers });
  }
  update<T>(url: string, toUpdate: T) {
    return this.httpClient.put<T>(url,
      toUpdate,
      { headers: this.headers });
  }
  delete(url: string) {
    return this.httpClient.delete(url);
  }
}
