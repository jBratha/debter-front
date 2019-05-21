import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormControlName} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import {Debt} from "../../_models/debt";
import {faEquals, faGreaterThan, faLessThan} from "@fortawesome/free-solid-svg-icons";
import {DebtFilterValues} from "./debt-filter-values";

@Component({
  selector: 'app-debt-filter',
  templateUrl: './debt-filter.component.html',
  styleUrls: ['./debt-filter.component.scss'],
  outputs: ['filterEvent']
})
export class DebtFilterComponent implements OnInit {
  debtors = new FormControl();
  creditors = new FormControl();
  amountType = new FormControl('>');
  amount = new FormControl();
  icons = {
    lessThan: faLessThan,
    greaterThan: faGreaterThan,
    equals: faEquals
  };

  users: string[] = ['admin', 'kator', 'user'];

  @Output() filterEvent = new EventEmitter<DebtFilterValues>();
  filterValues: DebtFilterValues = new DebtFilterValues();

  constructor() {

  }

  sendMessage() {
    this.filterEvent.emit(this.filterValues);
  }

  ngOnInit() {
    this.debtors.valueChanges
      .subscribe(
        debtor => {
          this.filterValues.debtor = debtor;
          this.sendMessage();
        }
      );
    this.creditors.valueChanges
      .subscribe(
        creditor => {
          this.filterValues.creditor = creditor;
          this.sendMessage();
        }
      );
    this.amountType.valueChanges
      .subscribe(
        amountType => {
          this.filterValues.amountType = amountType;
          this.sendMessage();
        }
      );
    this.amount.valueChanges
      .subscribe(
        amount => {
          this.filterValues.amountValue = amount;
          this.sendMessage();
        }
      );
  }

}

