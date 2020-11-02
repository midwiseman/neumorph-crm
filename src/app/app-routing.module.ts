import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', component: ClientsTableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: UserSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
