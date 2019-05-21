import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Debt, DebtStatus} from '../_models/debt';
import {DebtService} from '../_services/debt.service';
import {AuthenticationService} from '../_services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {DebtFilterComponent} from "./debt-filter/debt-filter.component";
import {DebtFilterValues} from "./debt-filter/debt-filter-values";

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})
export class DebtComponent implements OnInit {
  navigationSubscription;
  username = '';
  displayColumns: Column[] = [
    {field: 'id', show: 'Id'},
    {field: 'debtor', show: 'Dłużnik', footer: 'Łącznie'},
    {field: 'creditor', show: 'Wierzyciel'},
    {field: 'description', show: 'Opis'},
    // {field: 'date', show: 'Data'},
    // {field: 'status', show: 'Stan'},
  ];
  filterValues: DebtFilterValues;

  columnsToDisplay: string[];
  dataSource = new MatTableDataSource<Debt>();
  summary = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private debtService: DebtService,
              private authService: AuthenticationService,
              private router: Router) {
    this.columnsToDisplay = this.displayColumns.map(col => col.field);
    this.columnsToDisplay.splice(3, 0, 'amount');
    this.columnsToDisplay.splice(5, 0, 'status');
    this.columnsToDisplay.splice(6, 0, 'date');
    this.columnsToDisplay.push('buttons');
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.getDebts();
    this.username = this.authService.currentUserUsername();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.debtFilter();
    this.dataSource.paginator = this.paginator;
  }

  // amountMatch(type: string, amount: number, value: number):boolean {
  //   switch (type) {
  //     case '>': return amount > value;
  //     case '<': return amount < value;
  //     case '=': return amount == value;
  //     default: return false;
  //   }
  // }

  debtFilter(): (data: any, filter: string) => boolean {
    let amountMatch = function(type: string, amount: number, value: number):boolean {
      if(!amount) return true;
      switch (type) {
        case '>': return amount > value;
        case '<': return amount < value;
        case '=': return amount == value;
        default: return false;
      }
    };
    let nameMatch = function(filterValue: [string], data: string): boolean {
      if (!filterValue) return true;
      if (filterValue.length < 1) return true;
      for (let i of filterValue){
        if(data.toLowerCase().indexOf(i) !== -1) return true;
      }
      return false;
    };

    let filterFunction = function (data, filter): boolean {


      let searchTerms = JSON.parse(filter);
      console.log(searchTerms);
      // debtor & creditor

      const creditor = nameMatch(searchTerms.creditor, data.creditor);
      const debtor = nameMatch(searchTerms.debtor, data.debtor);
      const amount = amountMatch(searchTerms.amountType, searchTerms.amountValue, data.amount);

      console.log(data);
      console.log(creditor, debtor, amount);

      return creditor && debtor && amount;
    };
    return filterFunction;
  }



  ngOnInit() {
    this.initialiseInvites();
    // this.getDebts();
    // this.username = this.authService.currentUserUsername();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  receiveMessage($event) {
    this.filterValues = $event;
    this.dataSource.filter = JSON.stringify(this.filterValues);
    this.getTotalDebt();
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.getTotalDebt();
  }

  getDebts() {
    this.debtService.getAllDebts<Debt[]>()
      .subscribe((result: any) => {
        result.body.map(debt => {
          debt.creditor = debt.creditor.username;
          debt.debtor = debt.debtor.username;
          // debt.amount = debt.amount + ' zł';
        });
        this.dataSource.data = result.body;
        this.getTotalDebt();
      });
  }

  getRowStyle(debt: Debt) {
    switch (debt.status) {
      case DebtStatus.NOT_CONFIRMED:
        return 'row-debt-not-confirmed';
      case DebtStatus.RESOLVED:
        return 'row-debt-resolved';
    }
    return (debt.debtor === this.username) ? 'row-debtor' : 'row-creditor';
  }

  getTotalDebt() {
    const all = this.dataSource.filteredData;
    if (all) {
      const debt = all.filter(d =>
        (d.status === DebtStatus.CONFIRMED || d.status === DebtStatus.CONFIRMED_TO_BE_RESOLVED)
        && d.debtor === this.username)
        .map(d => d.amount)
        .reduce((acc, value) => Number(acc) + Number(value), 0);
      const credit = all.filter(d =>
        (d.status === DebtStatus.CONFIRMED || d.status === DebtStatus.CONFIRMED_TO_BE_RESOLVED)
        && d.creditor === this.username)
        .map(d => d.amount)
        .reduce((acc, value) => Number(acc) + Number(value), 0);
      this.summary = credit - debt;
    } else {
      this.summary = 0;
    }
  }

  getStatus(status: DebtStatus) {
    switch (status) {
      case DebtStatus.CONFIRMED_TO_BE_RESOLVED:
        return 'aktualny, do rozwiązania';
      case DebtStatus.CONFIRMED:
        return 'aktualny';
      case DebtStatus.NOT_CONFIRMED:
        return 'niezatwierdzony';
      case DebtStatus.RESOLVED:
        return 'zapłacony';
    }
  }

  showResolveButton(debt: Debt) {
    return this.authService.isAdmin() ||
      debt.status === 'CONFIRMED' ||
      (debt.status === 'CONFIRMED_TO_BE_RESOLVED' && debt.toConfirmBy === this.username);
  }

  showConfirmButton(debt: Debt) {
    return this.authService.isAdmin() ||
      (debt.status === 'NOT_CONFIRMED' && debt.toConfirmBy === this.username);
  }


  confirm(debt: Debt) {
    this.debtService.confirm(debt).subscribe((e: any) => {
        this.router.navigate(['/debts']);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  resolve(debt: Debt) {
    this.debtService.resolve(debt).subscribe((e: any) => {
      this.router.navigate(['/debts']);
    }, error1 => {
      console.log(error1);
    });
  }

}

class Column {
  field: string;
  show: string;
  footer?: string;
}
