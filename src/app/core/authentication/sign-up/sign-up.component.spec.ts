/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable dot-notation */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { InputComponent } from '@shared/input/input.component';

import { AuthenticationService } from '../authentication.service';

import { SignUpComponent } from './sign-up.component';

import type { ComponentFixture } from '@angular/core/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let httpMock: HttpTestingController;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Create spies for the AuthenticationService and Router
    authServiceMock = jasmine.createSpyObj('AuthenticationService', [
      'signUp',
      'setIsSignedUp',
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent, InputComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // This is to make sure there are no outstanding requests
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when the user fills in the first name, then deletes it and unfocuses the input', () => {
    const firstNameInput = fixture.nativeElement.querySelector('#firstName');
    const firstNameControl = component.signUpForm.controls.firstName;

    // set value
    firstNameControl.setValue('John');
    firstNameControl.markAsTouched();
    firstNameControl.markAsDirty();

    // delete value
    firstNameControl.setValue('');

    // unfocus first name input
    firstNameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('#firstNameError');

    expect(firstNameControl?.errors?.['required']).toBeTrue();
    expect(errorEl.textContent).toContain('First name is required');
  });

  it('should show error when the user fills in the last name, then deletes it and unfocuses the input', () => {
    const lastNameInput = fixture.nativeElement.querySelector('#lastName');
    const lastNameControl = component.signUpForm.controls.lastName;

    // set value
    lastNameControl.setValue('Doe');
    lastNameControl.markAsTouched();
    lastNameControl.markAsDirty();

    // delete value
    lastNameControl.setValue('');

    // unfocus last name input
    lastNameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('#lastNameError');

    expect(lastNameControl?.errors?.['required']).toBeTrue();
    expect(errorEl.textContent).toContain('Last name is required');
  });

  it('should show error when the user fills in the invalid email and then unfocuses the input', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    const emailControl = component.signUpForm.controls.email;

    // set value
    emailControl.setValue('email@');
    emailControl.markAsTouched();
    emailControl.markAsDirty();

    // unfocus email input
    emailInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('#emailError');

    expect(emailControl?.errors?.['emailInvalid']).toBeTrue();
    expect(errorEl.textContent).toContain('Please enter a valid email.');
  });

  it('should show correct error when the password is invalid and then user unfocuses the input', () => {
    const passwordInput = fixture.nativeElement.querySelector('#password');
    const passwordControl = component.signUpForm.controls.password;
    const firstNameControl = component.signUpForm.controls.firstName;

    // set value with no uppercase
    passwordControl.setValue('password');
    passwordControl.markAsTouched();
    passwordControl.markAsDirty();

    // unfocus password input
    passwordInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    let errorEl = fixture.nativeElement.querySelector('#passwordError');

    expect(passwordControl?.errors?.['caseInvalid']).toBeTrue();
    expect(errorEl.textContent).toContain(
      'Please use at least 1 uppercase and 1 lowercase character.'
    );

    // set value which is too short
    passwordControl.setValue('pass');
    fixture.detectChanges();
    errorEl = fixture.nativeElement.querySelector('#passwordError');

    expect(passwordControl?.errors?.['minlength']).toBeTruthy();
    expect(errorEl.textContent).toContain(
      'Your password must be at least 8 characters long.'
    );

    // set value which contains first name
    firstNameControl.setValue('John');
    passwordControl.setValue('johnPassword');
    fixture.detectChanges();
    errorEl = fixture.nativeElement.querySelector('#passwordError');

    expect(passwordControl?.errors?.['nameInPassword']).toBeTrue();
    expect(errorEl.textContent).toContain(
      'Your password should not contain your first or last name.'
    );
  });

  it('should show success message when the password is valid', () => {
    const passwordControl = component.signUpForm.controls.password;
    const firstNameControl = component.signUpForm.controls.firstName;
    const lastNameControl = component.signUpForm.controls.lastName;

    // set value
    firstNameControl.setValue('John');
    lastNameControl.setValue('Doe');
    passwordControl.setValue('Password1234');
    passwordControl.markAsTouched();
    passwordControl.markAsDirty();

    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('#passwordError');
    const successEl = fixture.nativeElement.querySelector('#passwordSuccess');

    expect(passwordControl?.errors).toBeFalsy();
    expect(errorEl).toBeNull();
    expect(successEl.textContent).toContain(
      'Good job! This is a great password.'
    );
  });

  it('should have a valid sign up form when all fields are filled in correctly', () => {
    component.signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@example.com',
      password: 'Password1234',
    });

    expect(component.signUpForm.valid).toBeTrue();
  });

  it('should call signUp method of AuthenticationService and navigate to /dashboard when form is submitted', () => {
    const formEl = fixture.nativeElement.querySelector('form');
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@example.com',
      password: 'Password1234',
    };
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    authServiceMock.signUp.and.returnValue(of({})); // We mock the signUp method of the AuthenticationService to return an empty Observable
    component.signUpForm.setValue(formData);

    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(authServiceMock.signUp).toHaveBeenCalledWith(requestData);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
