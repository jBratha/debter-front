import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';
import {AlertService} from "../_services/alert.service";
import {MatCheckbox} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  showPassword: MatCheckbox;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // isFieldInvalid(field: string) { // {6}
  //   return (
  //     (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
  //     // (this.loginForm.get(field).untouched && this.loginForm.get(field).)
  //   );
  // }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('onSubmit');
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log('loading');

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          debugger;

          console.log("data");
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          debugger;
          console.log("error");
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
