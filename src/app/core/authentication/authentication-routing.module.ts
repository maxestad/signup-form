import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';

import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthenticationRoutingModule {}
