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
  // The boolean value would suffice for the scope of this app, but BehaviorSubject is a more robust solution for a real-world app.
  // It is useful when you need to reactively notify other parts of your application (e.g. services, components) about the signUp status change.
  // New subscribers will immediately get a value upon subscription.
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
