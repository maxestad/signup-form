import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';

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
  private readonly apiUrl = 'https://demo-api.vercel.app/users';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp(user: UserType): Observable<UserType | { error: any }> {
    return this.http
      .post<UserType>(this.apiUrl, {
        user,
      })
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);

          return of({ error });
        })
      );
  }

  getIsSignedUp(): Observable<boolean> {
    return this.isUserSignedUp.asObservable();
  }

  setIsSignedUp(value: boolean): void {
    this.isUserSignedUp.next(value);
  }
}
