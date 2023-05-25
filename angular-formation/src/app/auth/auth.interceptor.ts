import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { User } from './user.model';
import { exhaustMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user: User = this.authService.userLogged$.value;

    if (!user || this.isAuthRequest(req)) {
      return next.handle(req);
    }

    const cloned = req.clone({
      url: `${req.url}?auth=${user.token}`,
    });

    return next.handle(cloned);

    // return this.authService.userLogged$.pipe(
    //   take(1),
    //   exhaustMap((user: User) => {
    //     if (!user || this.isAuthRequest(req)) {
    //       return next.handle(req);
    //     }

    //     const cloned = req.clone({
    //       url: `${req.url}?auth=${user.token}`,
    //     });

    //     return next.handle(cloned);
    //   })
    // );
  }

  private isAuthRequest(req: HttpRequest<any>): boolean {
    return (
      req.method === 'POST' && req.url.startsWith(this.authService.AUTH_URL)
    );
  }
}
