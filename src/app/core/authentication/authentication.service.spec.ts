import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserType } from '@models/user';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // This is to make sure there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform signUp request correctly', (done: DoneFn) => {
    const testUser: UserType = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@example.com',
    };

    service.signUp(testUser).subscribe({
      next: (res) => {
        expect(res).toEqual(testUser);
        done();
      },
      error: done.fail,
    });

    const req = httpMock.expectOne('https://demo-api.vercel.app/users');
    expect(req.request.method).toEqual('POST');

    // Respond with mock data, causing Observable to resolve.
    req.flush(testUser);
  });

  it('should handle error in signUp method', (done: DoneFn) => {
    const testUser: UserType = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@example.com',
    };
    const errorMessage = 'A nasty error occurred';

    service.signUp(testUser).subscribe({
      next: (result) => {
        if (result instanceof Error) {
          expect(result.message).toContain(errorMessage);
          done();
        } else {
          fail('Expected an Error object, but did not receive one');
        }
      },
      error: () => {
        fail('should not have thrown an error');
      },
    });

    const req = httpMock.expectOne('https://demo-api.vercel.app/users');
    expect(req.request.method).toEqual('POST');
    // Respond with mock error
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('#getIsSignedUp should return Observable<boolean> with initial value of false', (done: DoneFn) => {
    service.getIsSignedUp().subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('#setIsSignedUp should set Observable<boolean> to true', () => {
    service.setIsSignedUp(true);
    service.getIsSignedUp().subscribe((value) => {
      expect(value).toBe(true);
    });
  });
});
