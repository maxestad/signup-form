import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

import type { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        ({ DashboardModule }) => DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    title: 'Sign-up',
    loadChildren: () =>
      import('./core/authentication/authentication.module').then(
        ({ AuthenticationModule }) => AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
