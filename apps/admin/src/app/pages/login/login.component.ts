import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this._initLoginForm()
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) 
      console.log('inavalid');
   
    else console.log('submited');
    
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
