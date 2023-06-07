import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  delay,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router, RouterModule } from '@angular/router';

export type AuthResponseData = {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
  userLogged$ = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.AUTH_URL}:signUp?key=${environment.firebase.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => throwError(() => this.getErrorMessage(error))),
        tap((response: AuthResponseData) =>
          this.saveLoggedUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          )
        )
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.AUTH_URL}:signInWithPassword?key=${environment.firebase.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => throwError(() => this.getErrorMessage(error))),
        tap((response: AuthResponseData) => {
          this.saveLoggedUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }

  logout() {
    this.userLogged$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (user.token) {
      this.userLogged$.next(user);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  saveLoggedUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const user = new User(
      email,
      localId,
      idToken,
      new Date(new Date().getTime() + +expiresIn * 1000)
    );
    this.userLogged$.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  isAuthenticated() {
    return !!this.userLogged$.value;
  }

  getErrorMessage(error) {
    let errorMessage = 'An unknown error occurred!';
    if (!error.error || !error.error.error) {
      return errorMessage;
    }
    return error.error.error.message;
  }
}
