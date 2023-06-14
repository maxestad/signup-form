import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

export const authGuard = (): boolean | Promise<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const isSignedUp = authService.getIsSignedUp();

  return isSignedUp ? true : (router.navigate(['/sign-up']), false);
};
