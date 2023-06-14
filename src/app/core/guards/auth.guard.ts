import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';

export const authGuard = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  return authService
    .getIsSignedUp()
    .pipe(
      map((isSignedUp) =>
        isSignedUp ? true : (router.navigate(['/sign-up']), false)
      )
    );
};
