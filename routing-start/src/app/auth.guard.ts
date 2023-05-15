import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().then((authenticated: boolean) => {
    if (authenticated) {
      return true;
    } else {
      console.log('redirecting to /');
      router.navigate(['/']);
    }
  });
};
