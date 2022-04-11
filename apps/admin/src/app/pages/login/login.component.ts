import {  Router } from '@angular/router';
import { LocalstorageService } from '@develop/users';
import { AuthService } from '@develop/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong!';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm()
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token)
        this.router.navigateByUrl('/')
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 401) {
          this.authMessage = 'Error in the Server!';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
