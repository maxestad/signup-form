import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
