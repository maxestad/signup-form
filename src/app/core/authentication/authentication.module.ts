import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
  declarations: [SignUpComponent],
})
export class AuthenticationModule {}
