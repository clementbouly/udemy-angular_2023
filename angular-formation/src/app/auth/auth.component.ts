import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoading = false;
  errorMessage: string;

  constructor(private authService: AuthServiceService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService
      .signIn(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.isLoggedIn = true;
          this.router.navigate(['/recipes']); // redirect to /recipes
        },
        error: (errorMessage) => {
          this.errorMessage = errorMessage;
        },
      });
  }

  onRegister() {
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService
      .signUp(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (errMessage) => {
          this.errorMessage = errMessage;
        },
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
