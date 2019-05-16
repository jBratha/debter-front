import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../_models/user';
import {Debt} from '../_models/debt';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  endpoint: string = environment.api + '/debts';

  constructor(private http: HttpClient) {
  }

  getAllDebts<T>() {
    return this.http.get<Debt[]>(`${this.endpoint}/`, {observe: 'response'});
  }
}
