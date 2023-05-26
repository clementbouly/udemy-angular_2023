import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost!: PlaceholderDirective;

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoading = false;
  errorMessage: string;
  private closeSub: Subscription;

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
          this.showErrorAlert(errorMessage);
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

  onHandleError() {
    this.errorMessage = null;
  }

  private showErrorAlert(errorMessage: string) {
    console.log(this.alertHost);

    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef =
      hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = errorMessage;
    // listen to the close event
    this.closeSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.closeSub?.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.closeSub?.unsubscribe();
  }
}
