import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Debt} from "../_models/debt";

@Injectable({
  providedIn: 'root'
})
export class DebtFilterService {

  endpoint: string = environment.api + '/debts';

  constructor(private http: HttpClient) {
  }

  getAllDebts<T>() {
    return this.http.get<Debt[]>(`${this.endpoint}/`, {observe: 'response'});
  }

  postDebt(debt: Debt) {
    return this.http.post(`${this.endpoint}/`, debt)
  }
}
