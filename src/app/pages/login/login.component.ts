import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public formError: any;
  public loggedIn!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  public get F_email(): AbstractControl { return this.form.get('email') as AbstractControl; }
  public get F_password(): AbstractControl { return this.form.get('password') as AbstractControl; }

  ngOnInit() {
  }

  public goToLogin(page: string): void {
    this._router.navigateByUrl(page);
  }

  public login() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const payload = {
      email: this.F_email.value,
      password: this.F_password.value,
    }

    this._authService.signInEmailAndPassword(payload).then((res: any) => {
      if (res?.user) {
        console.log('SUCESSO!!!!', res);
        this._router.navigateByUrl('home');
      }
    }).catch((err: any) => {
      console.log(`error`, err);
    })
  }

  getErrorMessage() {
    if (this.F_email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.F_email.hasError('email') ? 'Not a valid email' : '';
  }


}
