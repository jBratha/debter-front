import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {DebtService} from '../../_services/debt.service';
import {Debt} from '../../_models/debt';
import {Router} from '@angular/router';
import {DebtValidation} from '../../_helpers/debt-validation';

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.component.html',
  styleUrls: ['./add-debt.component.scss']
})
export class AddDebtComponent implements OnInit {
  usernames: string[];
  debt = new NewDebt();
  debtForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private debtService: DebtService,
    private router: Router
  ) {

  }

  ngOnInit() {

    this.debtForm = this.formBuilder.group({
      debtor: ['', Validators.required],
      creditor: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    }, {validator: DebtValidation.DuplicateUser});

    this.getUserNames();
  }

  getUserNames() {
    this.userService.getUsernames<string>()
      .subscribe((usernames: any) => {
        this.usernames = usernames.body;
      });
  }

  get f() {
    return this.debtForm.controls;
  }

  onSubmit() {
    if (this.debtForm.invalid) {
      return;
    }

    const debt = new Debt();

    // debt.id =  '',
    debt.debtor = this.f.debtor.value;
    debt.creditor = this.f.creditor.value;
    debt.amount = this.f.amount.value;
    debt.description = this.f.description.value;

    this.debtService.postDebt(debt)
      .pipe(first())
      .subscribe(
        data => {
          // this.router.navigate(['debts']);
          this.router.navigate(['/debts']);
        }, error1 => {
          console.log(error1);
        }
      );


    // this.debtService.postDebt({})

    // this.submitted = true;
    //
    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    //
    // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     }, error1 => {
    //       this.loading = false;
    //     });
  }

  // clear() {
  //   this.debtForm.reset();
  //   this.debtForm;
  // }
}

class NewDebt {
  debtor: string;
  creditor: string;
  amount: number;
  description: string;
}

