import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: Column[] = [
    {field: 'id', show: 'Id'},
    {field: 'username', show: 'Użytkownik'},
    {field: 'firstname', show: 'Imię'},
    {field: 'lastname', show: 'Nazwisko'},
    {field: 'email', show: 'Mail'},
    {field: 'enabled', show: 'Aktywny'}
    // {field: 'lastPasswordResetDate', show: ''}
    // {field: 'authorities', show: 'Role'}

  ];
  columnsToDisplay: String[];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService) {
    this.columnsToDisplay = this.displayedColumns.map(col => col.field);
    this.columnsToDisplay.push('authorities');
  }

  ngOnInit() {
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printAuthorities(u: User) {
    if (u.authorities.length === 1) {
      return u.authorities[0].substring(5);
    }
    return u.authorities.reduce((s1, s2) => s1.substring(5) + ', ' + s2.substring(5));
  }

  private getUsers() {
    this.userService.getAllUsers<User[]>()
      .subscribe((users: any) => {
        const arr = users.body;
        arr.forEach(u => u.authorities = u.authorities.map(a => a.name));
        this.dataSource.data = arr;
      });
  }
}

class Column {
  field: string;
  show: string;
}
