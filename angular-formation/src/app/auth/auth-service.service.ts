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
        }),
        delay(1000)
      );
  }

  logout() {
    this.userLogged$.next(null);
    this.router.navigate(['/login']);
  }

  saveLoggedUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const userLogged$ = new User(
      email,
      localId,
      idToken,
      new Date(new Date().getTime() + +expiresIn * 1000)
    );
    this.userLogged$.next(userLogged$);
  }

  getErrorMessage(error) {
    let errorMessage = 'An unknown error occurred!';
    if (!error.error || !error.error.error) {
      return errorMessage;
    }
    return error.error.error.message;
  }
}
