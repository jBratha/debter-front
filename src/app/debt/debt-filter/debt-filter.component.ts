import { Component, OnInit } from '@angular/core';
import {FormControl, FormControlName} from "@angular/forms";

@Component({
  selector: 'app-debt-filter',
  templateUrl: './debt-filter.component.html',
  styleUrls: ['./debt-filter.component.scss']
})
export class DebtFilterComponent implements OnInit {
  debtors = new FormControl();
  creditors = new FormControl();
  amountType = new FormControl('>');

  users: string[] = ['admin', 'kator', 'user'];
  filter = {
    field: 'studentAge',
    criteria: '',
    filtervalue: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
