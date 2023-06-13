import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [CommonModule, RouterModule, AuthenticationRoutingModule],
  declarations: [SignUpComponent],
})
export class AuthenticationModule {}
