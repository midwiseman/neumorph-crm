import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/navigation/top-bar/top-bar.component';
import { ToggleSideBarComponent } from './components/navigation/toggle-side-bar/toggle-side-bar.component';
import { SideBarComponent } from './components/navigation/side-bar/side-bar.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ToggleSideBarComponent,
    SideBarComponent,
    ClientsTableComponent,
    DashboardComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
