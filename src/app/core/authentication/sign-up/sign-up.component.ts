import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy {
  public readonly signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, this.emailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.caseValidator(),
      this.nameInPasswordValidator(),
    ]),
  });
  public passwordErrorMessage = '';
  private passwordStatusChangeSubscription: Subscription | undefined;
  private firstNameChangeSubscription: Subscription | undefined;
  private lastNameChangeSubscription: Subscription | undefined;

  constructor() {}

  ngOnInit(): void {
    // We subscribe to the statusChanges observable of the password form control to update the password error message when the password status changes.
    this.passwordStatusChangeSubscription =
      this.password?.statusChanges.subscribe(() => {
        this.passwordErrorMessage = this.getPasswordErrorMessage();
      });
    // We subscribe to the valueChanges observable of the first name and last name form controls to update the password validity when the first name or last name changes.
    this.firstNameChangeSubscription = this.firstName?.valueChanges.subscribe(
      () => {
        this.password?.updateValueAndValidity();
      }
    );
    this.lastNameChangeSubscription = this.lastName?.valueChanges.subscribe(
      () => {
        this.password?.updateValueAndValidity();
      }
    );
  }

  get firstName(): AbstractControl<string | null> | null {
    return this.signUpForm?.controls.firstName;
  }

  get lastName(): AbstractControl<string | null> | null {
    return this.signUpForm?.controls.lastName;
  }

  get email(): AbstractControl<string | null> | null {
    return this.signUpForm?.controls.email;
  }

  get password(): AbstractControl<string | null> | null {
    return this.signUpForm?.controls.password;
  }

  // There is a built-in validator for email address in Angular but it is not very strict, it allows email addresses like "abc@abc"
  // We use a regular expression to check email validity.
  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailValue = control.value;
      // ^ matches the beginning of the string
      // [a-zA-Z0-9._-]+: checks for one or more (+) characters that are either lowercase letters (a-z), uppercase letters (A-Z), numbers (0-9), periods (.), underscores (_) or hyphens (-)
      // the . is escaped with a backslash
      // [a-zA-Z]{2,}: checks for two or more ({2,}) characters that are either lowercase letters (a-z) or uppercase letters (A-Z)
      // $ matches the end of the string
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(emailValue);

      return !isValidEmail ? { emailInvalid: true } : null;
    };
  }

  private caseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue = control.value;
      // (?=.*[a-z]): This part checks for the presence of at least one lowercase letter in the given string
      // (?=.*[A-Z]): This part checks for the presence of at least one uppercase letter in the given string

      // The ?= is a positive lookahead assertion, which checks if the pattern inside the assertion exists in the string without consuming any characters, meaning after assertion
      // the regex engine will go back to the beginning of the string to check the next assertion.

      // The . matches any character except line breaks.
      // The * matches the previous token between zero and unlimited times, as many times as possible
      // Without .*, the regex would only check if the string starts with a lowercase or uppercase letter
      const caseCheckRegex = /(?=.*[a-z])(?=.*[A-Z])/;
      const hasValidCase = caseCheckRegex.test(passwordValue);

      return !hasValidCase ? { caseInvalid: true } : null;
    };
  }

  private nameInPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // We convert a string to lowercase letters to make the comparison case insensitive
      const passwordValue = control.value.toLowerCase();
      const firstNameValue = this.firstName?.value?.toLowerCase();
      const lastNameValue = this.lastName?.value?.toLowerCase();

      if (
        (firstNameValue && passwordValue.includes(firstNameValue)) ||
        (lastNameValue && passwordValue.includes(lastNameValue))
      ) {
        return { nameInPassword: true };
      } else {
        return null;
      }
    };
  }

  private getPasswordErrorMessage(): string {
    const errors = this.password?.errors;
    if (!errors) {
      return '';
    }

    const errorKey = Object.keys(errors)[0];

    switch (errorKey) {
      case 'minlength':
        return 'Your password must be at least 8 characters long.';

      case 'caseInvalid':
        return 'Please use at least 1 uppercase and 1 lowercase character.';

      case 'nameInPassword':
        return 'Your password should not contain your first or last name.';

      default:
        return '';
    }
  }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();
  }

  // This method is used to remove the red border and error around the input field when the user starts typing for a better user experience.
  public onInputChange(control: AbstractControl): void {
    control.markAsUntouched();
  }

  // This method is used to unsubscribe from the subscriptions when the component is destroyed to avoid memory leaks.
  ngOnDestroy(): void {
    this.passwordStatusChangeSubscription?.unsubscribe();
    this.firstNameChangeSubscription?.unsubscribe();
    this.lastNameChangeSubscription?.unsubscribe();
  }
}
