import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserDto } from '../../models/user.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  public isLoading = false;
  public authForm: FormGroup;
  public error: string = null;

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this._initForm();
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {
    this.isLoading = true;
    const { email, password } = this.authForm.value;
    let authObs: Observable<UserDto>;

    if (this.isLoginMode) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signUp(email, password);
    }

    authObs.subscribe(
      (authResponse: UserDto) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        this.isLoading = false;
        this.error = errorMessage;
      });
  }

  private _initForm(): void {
    this.authForm = this._formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]]
    });
  }
}
