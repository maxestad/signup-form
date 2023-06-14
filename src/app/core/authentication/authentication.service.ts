import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import type { UserType } from '@models/user';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}
  private isUserSignedUp: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  signUp(user: UserType): void {
    this.http.post('https://demo-api.vercel.app/users', {
      user,
    });
  }

  getIsSignedUp(): Observable<boolean> {
    return this.isUserSignedUp.asObservable();
  }
}
